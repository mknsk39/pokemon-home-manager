import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore'

export const loadOwnedFormIds = async (
  firestore: Firestore,
  userId: string,
): Promise<Set<number>> => {
  const ref = doc(firestore, 'userOwnership', userId)
  const snapshot = await getDoc(ref)

  if (!snapshot.exists()) {
    return new Set()
  }

  const data = snapshot.data()
  return new Set((data.ownedFormIds as number[]) ?? [])
}

export const addOwnedForm = async (
  firestore: Firestore,
  userId: string,
  formId: number,
): Promise<void> => {
  const ref = doc(firestore, 'userOwnership', userId)
  await setDoc(
    ref,
    {
      ownedFormIds: arrayUnion(formId),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}

export const removeOwnedForm = async (
  firestore: Firestore,
  userId: string,
  formId: number,
): Promise<void> => {
  const ref = doc(firestore, 'userOwnership', userId)
  await updateDoc(ref, {
    ownedFormIds: arrayRemove(formId),
    updatedAt: serverTimestamp(),
  })
}

export const subscribeToOwnership = (
  firestore: Firestore,
  userId: string,
  // eslint-disable-next-line no-unused-vars
  callback: (ownedFormIds: Set<number>) => void,
): (() => void) => {
  const ref = doc(firestore, 'userOwnership', userId)

  return onSnapshot(ref, (snapshot) => {
    if (!snapshot.exists()) {
      callback(new Set())
      return
    }

    const data = snapshot.data()
    callback(new Set((data.ownedFormIds as number[]) ?? []))
  })
}
