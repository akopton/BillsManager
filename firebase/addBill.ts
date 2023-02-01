import { query } from 'firebase/database'
import {
  addDoc,
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { billsRef, categoriesRef, db, productsRef } from './index'
import { stringToNumber } from '../methods/stringToNumber'
import { TBill } from '../types/Bill'
import { TCategory } from '../types/Category'

export const addBill = async (bill: TBill, selectedCategory?: TCategory) => {
  if (!bill.products.length) {
    alert('Musisz dodać produkty!')
    return
  }

  if (bill.products.some((el) => !el.value)) {
    alert('Proszę podać kwoty wybranych produktów!')
    return
  }

  const convertedProducts = bill.products.map((product) => {
    return {
      ...product,
      count:
        typeof product.count === 'string'
          ? stringToNumber(product.count)
          : product.count,
      value:
        typeof product.value === 'string'
          ? stringToNumber(product.value)
          : product.value,
    }
  })

  const newDocRef = await addDoc(billsRef, {
    ...bill,
    products: convertedProducts,
  })

  if (!selectedCategory) return

  await updateDoc(doc(categoriesRef, selectedCategory?.id), {
    ...selectedCategory,
    bills: [
      ...selectedCategory.bills,
      { ...bill, id: newDocRef.id, products: convertedProducts },
    ],
    value: selectedCategory.value + bill.value,
  })

  bill.products.forEach(async (product) => {
    await updateDoc(doc(productsRef, product.id), {
      category: selectedCategory.name,
    })
  })
}
