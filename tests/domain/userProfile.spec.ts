import { describe, expect, it } from 'vitest'
import type { User } from 'firebase/auth'
import { toUserProfile } from '../../domain/userProfile'

const createUser = (overrides: Partial<User>): User =>
  ({
    uid: 'user-1',
    displayName: 'Trainer',
    photoURL: 'https://example.com/avatar.png',
    ...overrides,
  }) as User

describe('toUserProfile', () => {
  it('maps firebase user to profile', () => {
    const profile = toUserProfile(createUser({}))

    expect(profile).toEqual({
      id: 'user-1',
      displayName: 'Trainer',
      photoURL: 'https://example.com/avatar.png',
    })
  })

  it('falls back when displayName or photoURL is missing', () => {
    const profile = toUserProfile(
      createUser({ displayName: null, photoURL: null }),
    )

    expect(profile).toEqual({
      id: 'user-1',
      displayName: '',
      photoURL: '',
    })
  })
})
