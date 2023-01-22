import { collection, getFirestore } from 'firebase/firestore'

export const db = getFirestore()
export const categoriesRef = collection(db, 'categories')
