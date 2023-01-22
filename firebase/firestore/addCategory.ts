import { addDoc, getDocs, query, where } from 'firebase/firestore'
import { TCategory } from '../../types/Category'
import { categoriesRef, db } from './database'

export const addCategory = async (category: TCategory) => {
  if (!category.name) {
    alert('Wpisz nazwę kategorii aby ją dodać!')
    return
  }

  const q = query(categoriesRef, where('name', '==', category.name))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.docs.length) {
    alert('Podana kategoria już istnieje!')
    return
  }

  await addDoc(categoriesRef, category)
}
