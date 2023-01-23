import { collection, getFirestore } from 'firebase/firestore'

export const db = getFirestore()
export const categoriesRef = collection(db, 'categories')
export const productsRef = collection(db, 'products')
export const billsRef = collection(db, 'bills')
