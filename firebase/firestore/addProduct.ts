import { query } from 'firebase/database'
import { addDoc, collection, getDocs, where } from 'firebase/firestore'
import { TProduct } from '../../types/Product'
import { categoriesRef, db, productsRef } from './database'

export const addProduct = async (product: TProduct) => {
  if (!product.name) {
    alert('Wpisz nazwę produktu aby ją dodać!')
    return
  }

  await addDoc(productsRef, product)
}
