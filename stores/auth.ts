import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from 'firebase/auth'
import type { UserProfile } from '../types/auth'
import { useFirebaseAuth, useFirebaseFirestore } from '../composables/useFirebase'
import { signInWithGooglePopup, signOutFromFirebase, subscribeToAuthChanges } from '../services/auth'
import { ensureUserProfile } from '../services/userProfile'
import { toUserProfile } from '../domain/userProfile'

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Unexpected authentication error'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const profile = ref<UserProfile | null>(null)
  const loading = ref(true)
  const initialized = ref(false)
  const error = ref<string | null>(null)

  let initPromise: Promise<void> | null = null
  let unsubscribe: (() => void) | null = null

  const initAuthListener = () => {
    if (initPromise) {
      return initPromise
    }

    loading.value = true
    error.value = null

    const auth = useFirebaseAuth()
    const firestore = useFirebaseFirestore()

    initPromise = new Promise((resolve) => {
      unsubscribe = subscribeToAuthChanges(auth, async (firebaseUser) => {
        user.value = firebaseUser
        profile.value = firebaseUser ? toUserProfile(firebaseUser) : null

        if (firebaseUser) {
          try {
            await ensureUserProfile(firestore, firebaseUser)
          } catch (err) {
            error.value = toErrorMessage(err)
          }
        }

        loading.value = false
        initialized.value = true
        resolve()
      })
    })

    return initPromise
  }

  const login = async () => {
    error.value = null
    const auth = useFirebaseAuth()

    try {
      await signInWithGooglePopup(auth)
    } catch (err) {
      error.value = toErrorMessage(err)
      throw err
    }
  }

  const logout = async () => {
    error.value = null
    const auth = useFirebaseAuth()

    try {
      await signOutFromFirebase(auth)
    } catch (err) {
      error.value = toErrorMessage(err)
      throw err
    } finally {
      user.value = null
      profile.value = null
    }
  }

  const dispose = () => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
    initPromise = null
    initialized.value = false
    loading.value = true
  }

  return {
    user,
    profile,
    loading,
    initialized,
    error,
    initAuthListener,
    login,
    logout,
    dispose,
  }
})
