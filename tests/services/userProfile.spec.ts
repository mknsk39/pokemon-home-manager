import * as firestore from 'firebase/firestore'
import type { User } from 'firebase/auth'
import { describe, expect, it, vi } from 'vitest'
import { ensureUserProfile } from '../../services/userProfile'

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(() => ({ ref: 'doc-ref' })),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  serverTimestamp: vi.fn(() => 'server-timestamp'),
}))

const createUser = (overrides: Partial<User>): User =>
  ({
    uid: 'user-1',
    displayName: 'Trainer',
    photoURL: 'https://example.com/avatar.png',
    ...overrides,
  }) as User

const createDocSnapshot = (
  doesExist: boolean,
): firestore.DocumentSnapshot<unknown, firestore.DocumentData> =>
  ({
    exists: (() => doesExist) as unknown as firestore.DocumentSnapshot<
      unknown,
      firestore.DocumentData
    >['exists'],
  }) as unknown as firestore.DocumentSnapshot<unknown, firestore.DocumentData>

describe('ensureUserProfile', () => {
  it('creates user profile when missing', async () => {
    const firestoreInstance = { name: 'firestore' }
    vi.mocked(firestore.getDoc).mockResolvedValueOnce(createDocSnapshot(false))

    await ensureUserProfile(firestoreInstance as never, createUser({}))

    expect(firestore.doc).toHaveBeenCalledWith(
      firestoreInstance,
      'users',
      'user-1',
    )
    expect(firestore.setDoc).toHaveBeenCalledWith(
      { ref: 'doc-ref' },
      expect.objectContaining({
        id: 'user-1',
        displayName: 'Trainer',
        photoURL: 'https://example.com/avatar.png',
        createdAt: 'server-timestamp',
      }),
      { merge: true },
    )
  })

  it('updates profile without overwriting createdAt when exists', async () => {
    const firestoreInstance = { name: 'firestore' }
    vi.mocked(firestore.getDoc).mockResolvedValueOnce(createDocSnapshot(true))

    await ensureUserProfile(firestoreInstance as never, createUser({}))

    expect(firestore.setDoc).toHaveBeenCalledWith(
      { ref: 'doc-ref' },
      {
        id: 'user-1',
        displayName: 'Trainer',
        photoURL: 'https://example.com/avatar.png',
      },
      { merge: true },
    )
  })
})
