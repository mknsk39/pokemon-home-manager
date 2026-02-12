import { describe, expect, it, vi, beforeEach } from 'vitest'
import { loadOwnedFormIds, addOwnedForm, removeOwnedForm, subscribeToOwnership } from '../../services/ownership'

vi.mock('firebase/firestore', () => ({
  doc: vi.fn((_firestore, _collection, _id) => ({ path: `${_collection}/${_id}` })),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  onSnapshot: vi.fn(),
  arrayUnion: vi.fn((value) => ({ __type: 'arrayUnion', value })),
  arrayRemove: vi.fn((value) => ({ __type: 'arrayRemove', value })),
  serverTimestamp: vi.fn(() => ({ __type: 'serverTimestamp' })),
}))

const { doc, getDoc, setDoc, updateDoc, onSnapshot } = await import('firebase/firestore')
const mockFirestore = {} as never

describe('ownership service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('loadOwnedFormIds', () => {
    it('returns owned form ids from Firestore document', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => true,
        data: () => ({ ownedFormIds: [1, 2, 3] }),
      } as never)

      const result = await loadOwnedFormIds(mockFirestore, 'user1')
      expect(doc).toHaveBeenCalledWith(mockFirestore, 'userOwnership', 'user1')
      expect(result).toEqual(new Set([1, 2, 3]))
    })

    it('returns empty set when document does not exist', async () => {
      vi.mocked(getDoc).mockResolvedValue({
        exists: () => false,
        data: () => null,
      } as never)

      const result = await loadOwnedFormIds(mockFirestore, 'user1')
      expect(result).toEqual(new Set())
    })
  })

  describe('addOwnedForm', () => {
    it('uses setDoc with arrayUnion and merge', async () => {
      vi.mocked(setDoc).mockResolvedValue(undefined)

      await addOwnedForm(mockFirestore, 'user1', 42)
      expect(doc).toHaveBeenCalledWith(mockFirestore, 'userOwnership', 'user1')
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          ownedFormIds: expect.anything(),
          updatedAt: expect.anything(),
        }),
        { merge: true },
      )
    })
  })

  describe('removeOwnedForm', () => {
    it('uses updateDoc with arrayRemove', async () => {
      vi.mocked(updateDoc).mockResolvedValue(undefined)

      await removeOwnedForm(mockFirestore, 'user1', 42)
      expect(doc).toHaveBeenCalledWith(mockFirestore, 'userOwnership', 'user1')
      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          ownedFormIds: expect.anything(),
          updatedAt: expect.anything(),
        }),
      )
    })
  })

  describe('subscribeToOwnership', () => {
    const callSnapshotHandler = (data: { exists: () => boolean; data: () => unknown }) => {
      const handler = vi.mocked(onSnapshot).mock.calls[0][1]
      ;(handler as Function)(data)
    }

    it('subscribes to onSnapshot and calls callback with Set', () => {
      const mockCallback = vi.fn()
      const mockUnsubscribe = vi.fn()
      vi.mocked(onSnapshot).mockReturnValue(mockUnsubscribe)

      const unsubscribe = subscribeToOwnership(mockFirestore, 'user1', mockCallback)

      expect(doc).toHaveBeenCalledWith(mockFirestore, 'userOwnership', 'user1')
      expect(onSnapshot).toHaveBeenCalled()

      callSnapshotHandler({
        exists: () => true,
        data: () => ({ ownedFormIds: [10, 20] }),
      })

      expect(mockCallback).toHaveBeenCalledWith(new Set([10, 20]))
      expect(unsubscribe).toBe(mockUnsubscribe)
    })

    it('calls callback with empty Set when document does not exist', () => {
      const mockCallback = vi.fn()
      vi.mocked(onSnapshot).mockReturnValue(vi.fn())

      subscribeToOwnership(mockFirestore, 'user1', mockCallback)

      callSnapshotHandler({
        exists: () => false,
        data: () => null,
      })

      expect(mockCallback).toHaveBeenCalledWith(new Set())
    })
  })
})
