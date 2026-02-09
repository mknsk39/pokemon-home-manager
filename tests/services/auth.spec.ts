import * as firebaseAuth from 'firebase/auth'
import { describe, expect, it, vi } from 'vitest'
import {
  signInWithGooglePopup,
  signOutFromFirebase,
  subscribeToAuthChanges,
} from '../../services/auth'

vi.mock('firebase/auth', () => {
  const mockProvider = { providerId: 'google' }
  return {
    GoogleAuthProvider: vi.fn(() => mockProvider),
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn(),
  }
})

describe('auth service', () => {
  it('signs in with Google popup', async () => {
    const auth = { name: 'auth' }

    await signInWithGooglePopup(auth as never)

    expect(firebaseAuth.signInWithPopup).toHaveBeenCalledWith(
      auth,
      expect.objectContaining({ providerId: 'google' }),
    )
  })

  it('signs out', async () => {
    const auth = { name: 'auth' }

    await signOutFromFirebase(auth as never)

    expect(firebaseAuth.signOut).toHaveBeenCalledWith(auth)
  })

  it('subscribes to auth changes', () => {
    const auth = { name: 'auth' }
    const handler = vi.fn()

    subscribeToAuthChanges(auth as never, handler)

    expect(firebaseAuth.onAuthStateChanged).toHaveBeenCalledWith(auth, handler)
  })
})
