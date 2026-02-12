import { describe, expect, it, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useOwnershipStore } from '../../stores/ownership'

vi.mock('../../composables/useFirebase', () => ({
  useFirebaseFirestore: vi.fn(() => ({})),
}))

vi.mock('../../services/ownership', () => ({
  subscribeToOwnership: vi.fn(),
  addOwnedForm: vi.fn(),
  removeOwnedForm: vi.fn(),
}))

const { subscribeToOwnership, addOwnedForm, removeOwnedForm } = await import('../../services/ownership')

describe('useOwnershipStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('has correct initial state', () => {
    const store = useOwnershipStore()
    expect(store.ownedFormIds).toEqual(new Set())
    expect(store.loading).toBe(false)
  })

  describe('startListening', () => {
    it('subscribes to ownership changes', () => {
      const mockUnsubscribe = vi.fn()
      vi.mocked(subscribeToOwnership).mockReturnValue(mockUnsubscribe)

      const store = useOwnershipStore()
      store.startListening('user1')

      expect(subscribeToOwnership).toHaveBeenCalledWith(
        expect.anything(),
        'user1',
        expect.any(Function),
      )
      expect(store.loading).toBe(true)
    })

    it('updates ownedFormIds when snapshot received', () => {
      vi.mocked(subscribeToOwnership).mockImplementation((_firestore, _userId, callback) => {
        callback(new Set([1, 2, 3]))
        return vi.fn()
      })

      const store = useOwnershipStore()
      store.startListening('user1')

      expect(store.ownedFormIds).toEqual(new Set([1, 2, 3]))
      expect(store.loading).toBe(false)
    })

    it('does not subscribe twice for same user', () => {
      vi.mocked(subscribeToOwnership).mockReturnValue(vi.fn())

      const store = useOwnershipStore()
      store.startListening('user1')
      store.startListening('user1')

      expect(subscribeToOwnership).toHaveBeenCalledTimes(1)
    })
  })

  describe('stopListening', () => {
    it('unsubscribes and resets state', () => {
      const mockUnsubscribe = vi.fn()
      vi.mocked(subscribeToOwnership).mockReturnValue(mockUnsubscribe)

      const store = useOwnershipStore()
      store.startListening('user1')
      store.stopListening()

      expect(mockUnsubscribe).toHaveBeenCalled()
      expect(store.ownedFormIds).toEqual(new Set())
      expect(store.loading).toBe(false)
    })
  })

  describe('isOwned', () => {
    it('returns true for owned form', () => {
      vi.mocked(subscribeToOwnership).mockImplementation((_firestore, _userId, callback) => {
        callback(new Set([42]))
        return vi.fn()
      })

      const store = useOwnershipStore()
      store.startListening('user1')

      expect(store.isOwned(42)).toBe(true)
    })

    it('returns false for unowned form', () => {
      vi.mocked(subscribeToOwnership).mockImplementation((_firestore, _userId, callback) => {
        callback(new Set([42]))
        return vi.fn()
      })

      const store = useOwnershipStore()
      store.startListening('user1')

      expect(store.isOwned(99)).toBe(false)
    })
  })

  describe('toggleOwnership', () => {
    it('adds form when not owned', async () => {
      vi.mocked(subscribeToOwnership).mockImplementation((_firestore, _userId, callback) => {
        callback(new Set())
        return vi.fn()
      })
      vi.mocked(addOwnedForm).mockResolvedValue(undefined)

      const store = useOwnershipStore()
      store.startListening('user1')
      await store.toggleOwnership(42)

      expect(addOwnedForm).toHaveBeenCalledWith(expect.anything(), 'user1', 42)
    })

    it('removes form when already owned', async () => {
      vi.mocked(subscribeToOwnership).mockImplementation((_firestore, _userId, callback) => {
        callback(new Set([42]))
        return vi.fn()
      })
      vi.mocked(removeOwnedForm).mockResolvedValue(undefined)

      const store = useOwnershipStore()
      store.startListening('user1')
      await store.toggleOwnership(42)

      expect(removeOwnedForm).toHaveBeenCalledWith(expect.anything(), 'user1', 42)
    })

    it('optimistically updates local state before Firestore responds', () => {
      vi.mocked(subscribeToOwnership).mockImplementation((_firestore, _userId, callback) => {
        callback(new Set())
        return vi.fn()
      })
      vi.mocked(addOwnedForm).mockReturnValue(new Promise(() => {})) // never resolves

      const store = useOwnershipStore()
      store.startListening('user1')
      store.toggleOwnership(42) // don't await

      // UI は即座に反映される
      expect(store.isOwned(42)).toBe(true)
    })

    it('handles rapid toggle correctly (double tap)', () => {
      vi.mocked(subscribeToOwnership).mockImplementation((_firestore, _userId, callback) => {
        callback(new Set())
        return vi.fn()
      })
      vi.mocked(addOwnedForm).mockReturnValue(new Promise(() => {}))
      vi.mocked(removeOwnedForm).mockReturnValue(new Promise(() => {}))

      const store = useOwnershipStore()
      store.startListening('user1')

      store.toggleOwnership(42) // 1回目: false→true
      expect(store.isOwned(42)).toBe(true)

      store.toggleOwnership(42) // 2回目: true→false
      expect(store.isOwned(42)).toBe(false)

      expect(addOwnedForm).toHaveBeenCalledTimes(1)
      expect(removeOwnedForm).toHaveBeenCalledTimes(1)
    })

    it('rolls back on Firestore error', async () => {
      vi.mocked(subscribeToOwnership).mockImplementation((_firestore, _userId, callback) => {
        callback(new Set())
        return vi.fn()
      })
      vi.mocked(addOwnedForm).mockRejectedValue(new Error('network error'))

      const store = useOwnershipStore()
      store.startListening('user1')

      await store.toggleOwnership(42)

      // エラー後はロールバックされる
      expect(store.isOwned(42)).toBe(false)
    })
  })

  describe('getOwnedCountForSpecies', () => {
    it('returns owned and total counts', () => {
      vi.mocked(subscribeToOwnership).mockImplementation((_firestore, _userId, callback) => {
        callback(new Set([100, 101]))
        return vi.fn()
      })

      const store = useOwnershipStore()
      store.startListening('user1')

      const getFormsFn = () => [
        { id: 100 },
        { id: 101 },
        { id: 102 },
      ] as never[]

      const result = store.getOwnedCountForSpecies(getFormsFn)
      expect(result).toEqual({ owned: 2, total: 3 })
    })

    it('returns zero counts when no forms owned', () => {
      vi.mocked(subscribeToOwnership).mockImplementation((_firestore, _userId, callback) => {
        callback(new Set())
        return vi.fn()
      })

      const store = useOwnershipStore()
      store.startListening('user1')

      const getFormsFn = () => [
        { id: 100 },
        { id: 101 },
      ] as never[]

      const result = store.getOwnedCountForSpecies(getFormsFn)
      expect(result).toEqual({ owned: 0, total: 2 })
    })
  })
})
