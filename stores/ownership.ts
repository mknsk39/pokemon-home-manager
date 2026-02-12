import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFirebaseFirestore } from '../composables/useFirebase'
import { subscribeToOwnership, addOwnedForm, removeOwnedForm } from '../services/ownership'

export const useOwnershipStore = defineStore('ownership', () => {
  const ownedFormIds = ref<Set<number>>(new Set())
  const loading = ref(false)

  let unsubscribe: (() => void) | null = null
  let currentUserId: string | null = null

  const isOwned = (formId: number): boolean => ownedFormIds.value.has(formId)

  const getOwnedCountForSpecies = (
    getFormsFn: () => { id: number }[],
  ): { owned: number; total: number } => {
    const forms = getFormsFn()
    const owned = forms.filter((f) => ownedFormIds.value.has(f.id)).length
    return { owned, total: forms.length }
  }

  const startListening = (userId: string) => {
    if (currentUserId === userId && unsubscribe) {
      return
    }

    stopListening()
    loading.value = true
    currentUserId = userId

    const firestore = useFirebaseFirestore()
    unsubscribe = subscribeToOwnership(firestore, userId, (ids) => {
      ownedFormIds.value = ids
      loading.value = false
    })
  }

  const stopListening = () => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
    currentUserId = null
    ownedFormIds.value = new Set()
    loading.value = false
  }

  const toggleOwnership = async (formId: number) => {
    if (!currentUserId) return

    const wasOwned = isOwned(formId)

    // 楽観的UI更新: Firestore応答前にローカルを即反映
    const next = new Set(ownedFormIds.value)
    if (wasOwned) {
      next.delete(formId)
    } else {
      next.add(formId)
    }
    ownedFormIds.value = next

    // Firestore へ書き込み（失敗時はロールバック）
    try {
      const firestore = useFirebaseFirestore()
      if (wasOwned) {
        await removeOwnedForm(firestore, currentUserId, formId)
      } else {
        await addOwnedForm(firestore, currentUserId, formId)
      }
    } catch {
      // ロールバック: 元の状態に戻す
      const rollback = new Set(ownedFormIds.value)
      if (wasOwned) {
        rollback.add(formId)
      } else {
        rollback.delete(formId)
      }
      ownedFormIds.value = rollback
    }
  }

  return {
    ownedFormIds,
    loading,
    isOwned,
    getOwnedCountForSpecies,
    startListening,
    stopListening,
    toggleOwnership,
  }
})
