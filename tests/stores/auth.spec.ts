import { createPinia, setActivePinia } from 'pinia'
import type { User } from 'firebase/auth'
import type { AuthChangeHandler } from '../../services/auth'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuthStore } from '../../stores/auth'

const mockAuth = { name: 'auth' }
const mockFirestore = { name: 'firestore' }

vi.mock('../../composables/useFirebase', () => ({
  useFirebaseAuth: () => mockAuth,
  useFirebaseFirestore: () => mockFirestore,
}))

const mockSignInWithGooglePopup = vi.fn()
const mockSignOutFromFirebase = vi.fn()
const mockSubscribeToAuthChanges = vi.fn()
let authCallback: AuthChangeHandler | null = null

vi.mock('../../services/auth', () => ({
  signInWithGooglePopup: (...args: unknown[]) => mockSignInWithGooglePopup(...args),
  signOutFromFirebase: (...args: unknown[]) => mockSignOutFromFirebase(...args),
  subscribeToAuthChanges: (...args: unknown[]) => {
    authCallback = args[1] as AuthChangeHandler
    mockSubscribeToAuthChanges(...args)
    return vi.fn()
  },
}))

const mockEnsureUserProfile = vi.fn()
vi.mock('../../services/userProfile', () => ({
  ensureUserProfile: (...args: unknown[]) => mockEnsureUserProfile(...args),
}))

const createUser = (overrides: Partial<User>): User =>
  ({
    uid: 'user-1',
    displayName: 'Trainer',
    photoURL: 'https://example.com/avatar.png',
    ...overrides,
  }) as User

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockSignInWithGooglePopup.mockReset()
    mockSignOutFromFirebase.mockReset()
    mockEnsureUserProfile.mockReset()
    mockSubscribeToAuthChanges.mockReset()
    authCallback = null
  })

  it('has initial state', () => {
    const store = useAuthStore()

    expect(store.user).toBeNull()
    expect(store.profile).toBeNull()
    expect(store.loading).toBe(true)
    expect(store.initialized).toBe(false)
  })

  it('initializes auth listener and updates state', async () => {
    const store = useAuthStore()
    const initPromise = store.initAuthListener()

    expect(authCallback).not.toBeNull()

    const user = createUser({})
    await authCallback?.(user)
    await initPromise

    expect(store.user?.uid).toBe('user-1')
    expect(store.profile?.id).toBe('user-1')
    expect(store.loading).toBe(false)
    expect(store.initialized).toBe(true)
    expect(mockEnsureUserProfile).toHaveBeenCalledWith(mockFirestore, user)
  })

  it('logs in with Google', async () => {
    const store = useAuthStore()

    await store.login()

    expect(mockSignInWithGooglePopup).toHaveBeenCalledWith(mockAuth)
  })

  it('logs out and clears state', async () => {
    const store = useAuthStore()
    const user = createUser({})

    const initPromise = store.initAuthListener()
    await authCallback?.(user)
    await initPromise

    await store.logout()

    expect(mockSignOutFromFirebase).toHaveBeenCalledWith(mockAuth)
    expect(store.user).toBeNull()
    expect(store.profile).toBeNull()
  })

  it('sets error state when login fails', async () => {
    const store = useAuthStore()
    mockSignInWithGooglePopup.mockRejectedValueOnce(new Error('popup closed'))

    await expect(store.login()).rejects.toThrow('popup closed')

    expect(store.error).toBe('popup closed')
  })

  it('sets error state and clears user when logout fails', async () => {
    const store = useAuthStore()
    const user = createUser({})

    const initPromise = store.initAuthListener()
    await authCallback?.(user)
    await initPromise

    mockSignOutFromFirebase.mockRejectedValueOnce(new Error('network error'))

    await expect(store.logout()).rejects.toThrow('network error')

    expect(store.error).toBe('network error')
    expect(store.user).toBeNull()
    expect(store.profile).toBeNull()
  })

  it('sets error state when ensureUserProfile fails during init', async () => {
    const store = useAuthStore()
    mockEnsureUserProfile.mockRejectedValueOnce(new Error('firestore error'))

    const initPromise = store.initAuthListener()
    await authCallback?.(createUser({}))
    await initPromise

    expect(store.error).toBe('firestore error')
    expect(store.profile).not.toBeNull()
    expect(store.loading).toBe(false)
  })

  it('does not subscribe twice on double initialization', () => {
    const store = useAuthStore()

    store.initAuthListener()
    store.initAuthListener()

    expect(mockSubscribeToAuthChanges).toHaveBeenCalledTimes(1)
  })

  it('resets state on dispose', async () => {
    const store = useAuthStore()

    const initPromise = store.initAuthListener()
    await authCallback?.(createUser({}))
    await initPromise

    expect(store.initialized).toBe(true)

    store.dispose()

    expect(store.initialized).toBe(false)
    expect(store.loading).toBe(true)
  })
})
