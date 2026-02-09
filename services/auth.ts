import {
  GoogleAuthProvider,
  type Auth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'

// eslint-disable-next-line no-unused-vars
export type AuthChangeHandler = (user: User | null) => void

export const signInWithGooglePopup = (auth: Auth) => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

export const signOutFromFirebase = (auth: Auth) => signOut(auth)

export const subscribeToAuthChanges = (
  auth: Auth,
  callback: AuthChangeHandler,
) => onAuthStateChanged(auth, callback)
