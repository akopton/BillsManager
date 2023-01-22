import { getDocs } from 'firebase/firestore'
import { categoriesRef } from './database'

export const getCategories = async () => {
  return await getDocs(categoriesRef)
}
