import type { User } from 'firebase/auth'
import type { UserProfile } from '../types/auth'

export const toUserProfile = (user: User): UserProfile => ({
  id: user.uid,
  displayName: user.displayName ?? '',
  photoURL: user.photoURL ?? '',
})
