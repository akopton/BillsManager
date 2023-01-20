import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import { TCategory } from '../../types/Category'

export const addCategory = async (category: TCategory) => {
  const db = getFirestore()
  await addDoc(collection(db, 'categories'), category)
}
