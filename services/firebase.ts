import { getApps, initializeApp } from 'firebase/app'
import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import type { Auth } from 'firebase/auth'
import {
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'

export interface FirebaseEmulatorConfig {
  useEmulator?: boolean
  host?: string
  authPort?: number
  firestorePort?: number
}

export interface FirebaseRuntimeConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
  emulator?: FirebaseEmulatorConfig
}

export interface FirebaseServices {
  app: FirebaseApp
  auth: Auth
  firestore: Firestore
  emulator: Required<FirebaseEmulatorConfig>
}

const REQUIRED_KEYS: Array<keyof FirebaseRuntimeConfig> = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
]

export function createFirebaseServices(
  runtimeConfig: FirebaseRuntimeConfig,
): FirebaseServices {
  for (const key of REQUIRED_KEYS) {
    if (!runtimeConfig[key]) {
      throw new Error(`Firebase runtime config missing required field: ${key}`)
    }
  }

  const emulatorDefaults: Required<FirebaseEmulatorConfig> = {
    useEmulator: runtimeConfig.emulator?.useEmulator ?? false,
    host: runtimeConfig.emulator?.host ?? '127.0.0.1',
    authPort: runtimeConfig.emulator?.authPort ?? 9099,
    firestorePort: runtimeConfig.emulator?.firestorePort ?? 8080,
  }

  const firebaseOptions: FirebaseOptions = {
    apiKey: runtimeConfig.apiKey,
    authDomain: runtimeConfig.authDomain,
    projectId: runtimeConfig.projectId,
    storageBucket: runtimeConfig.storageBucket,
    messagingSenderId: runtimeConfig.messagingSenderId,
    appId: runtimeConfig.appId,
    ...(runtimeConfig.measurementId
      ? { measurementId: runtimeConfig.measurementId }
      : {}),
  }

  const firebaseApp =
    getApps().length > 0 ? getApps()[0] : initializeApp(firebaseOptions)
  const auth = getAuth(firebaseApp)
  const firestore = getFirestore(firebaseApp)

  if (emulatorDefaults.useEmulator) {
    connectAuthEmulator(
      auth,
      `http://${emulatorDefaults.host}:${emulatorDefaults.authPort}`,
    )
    connectFirestoreEmulator(
      firestore,
      emulatorDefaults.host,
      emulatorDefaults.firestorePort,
    )
  }

  return {
    app: firebaseApp,
    auth,
    firestore,
    emulator: emulatorDefaults,
  }
}
