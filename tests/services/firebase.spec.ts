import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

const mockApp = { name: 'test-app' }
const mockAuth = { name: 'test-auth' }
const mockFirestore = { name: 'test-firestore' }

const mockInitializeApp = vi.fn(() => mockApp)
const mockGetApps = vi.fn(() => [])
vi.mock('firebase/app', () => ({
  initializeApp: mockInitializeApp,
  getApps: mockGetApps,
}))

const mockGetAuth = vi.fn(() => mockAuth)
const mockConnectAuthEmulator = vi.fn()
vi.mock('firebase/auth', () => ({
  getAuth: mockGetAuth,
  connectAuthEmulator: mockConnectAuthEmulator,
}))

const mockGetFirestore = vi.fn(() => mockFirestore)
const mockConnectFirestoreEmulator = vi.fn()
vi.mock('firebase/firestore', () => ({
  getFirestore: mockGetFirestore,
  connectFirestoreEmulator: mockConnectFirestoreEmulator,
}))

let createFirebaseServices: typeof import('../../services/firebase')['createFirebaseServices']

beforeAll(async () => {
  const module = await import('../../services/firebase')
  createFirebaseServices = module.createFirebaseServices
})

const baseConfig = {
  apiKey: 'test-key',
  authDomain: 'test-domain',
  projectId: 'test-project',
  storageBucket: 'test-bucket',
  messagingSenderId: 'test-sender',
  appId: 'test-app-id',
}

beforeEach(() => {
  vi.clearAllMocks()
  mockGetApps.mockReturnValue([])
})

describe('createFirebaseServices', () => {
  it('initializes Firebase and returns providers', () => {
    const services = createFirebaseServices(baseConfig)

    expect(mockInitializeApp).toHaveBeenCalledWith(
      expect.objectContaining({
        apiKey: baseConfig.apiKey,
        authDomain: baseConfig.authDomain,
        projectId: baseConfig.projectId,
        storageBucket: baseConfig.storageBucket,
        messagingSenderId: baseConfig.messagingSenderId,
        appId: baseConfig.appId,
      }),
    )
    expect(services.app).toBe(mockApp)
    expect(services.auth).toBe(mockAuth)
    expect(services.firestore).toBe(mockFirestore)
  })

  it('connects to the emulators when the flag is enabled', () => {
    const services = createFirebaseServices({
      ...baseConfig,
      emulator: {
        useEmulator: true,
        host: '127.0.0.1',
        authPort: 9199,
        firestorePort: 4141,
      },
    })

    expect(mockConnectAuthEmulator).toHaveBeenCalledWith(
      mockAuth,
      'http://127.0.0.1:9199',
    )
    expect(mockConnectFirestoreEmulator).toHaveBeenCalledWith(
      mockFirestore,
      '127.0.0.1',
      4141,
    )
    expect(services.emulator.useEmulator).toBe(true)
  })

  it('does not connect to emulators when disabled', () => {
    createFirebaseServices({
      ...baseConfig,
      emulator: {
        useEmulator: false,
      },
    })

    expect(mockConnectAuthEmulator).not.toHaveBeenCalled()
    expect(mockConnectFirestoreEmulator).not.toHaveBeenCalled()
  })

  it('throws when a required config field is missing', () => {
    // eslint-disable-next-line no-unused-vars
    const { apiKey: _apiKey, ...missingApiKey } = baseConfig

    expect(() =>
      createFirebaseServices(missingApiKey as never),
    ).toThrowError('Firebase runtime config missing required field: apiKey')
  })

  it('reuses existing app when already initialized', () => {
    const existingApp = { name: 'existing' }
    mockGetApps.mockReturnValue([existingApp])

    const services = createFirebaseServices(baseConfig)

    expect(mockInitializeApp).not.toHaveBeenCalled()
    expect(mockGetAuth).toHaveBeenCalledWith(existingApp)
    expect(services.app).toBe(existingApp)
  })
})
