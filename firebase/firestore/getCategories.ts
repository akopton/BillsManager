import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore'

export const getCategories = async () => {
  const db = getFirestore()
  const collectionRef = collection(db, 'categories')

  return await getDocs(collectionRef)
}
