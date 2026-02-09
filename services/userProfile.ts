import { doc, getDoc, serverTimestamp, setDoc, type Firestore } from 'firebase/firestore'
import type { User } from 'firebase/auth'
import { toUserProfile } from '../domain/userProfile'
import type { UserProfile } from '../types/auth'

export const ensureUserProfile = async (
  firestore: Firestore,
  user: User,
): Promise<UserProfile> => {
  const profile = toUserProfile(user)
  const ref = doc(firestore, 'users', profile.id)
  const snapshot = await getDoc(ref)

  const data = snapshot.exists()
    ? profile
    : {
        ...profile,
        createdAt: serverTimestamp(),
      }

  await setDoc(ref, data, { merge: true })
  return profile
}
