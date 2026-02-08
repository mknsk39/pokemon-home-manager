import { useNuxtApp } from '#app'

const ensure = <T>(service: T | undefined, name: string): T => {
  if (!service) {
    throw new Error(`Firebase plugin not initialized: ${name} is missing`)
  }

  return service
}

export const useFirebase = () => ensure(useNuxtApp().$firebase, 'Firebase app')

export const useFirebaseAuth = () =>
  ensure(useNuxtApp().$firebaseAuth, 'Firebase Auth')

export const useFirebaseFirestore = () =>
  ensure(useNuxtApp().$firebaseFirestore, 'Firebase Firestore')
