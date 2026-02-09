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
let authCallback: AuthChangeHandler | null = null

vi.mock('../../services/auth', () => ({
  signInWithGooglePopup: (...args: unknown[]) => mockSignInWithGooglePopup(...args),
  signOutFromFirebase: (...args: unknown[]) => mockSignOutFromFirebase(...args),
  subscribeToAuthChanges: (_auth: unknown, callback: AuthChangeHandler) => {
    authCallback = callback
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
})
