import {
  addDoc,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { billsRef, categoriesRef, monthsRef, productsRef } from './index'
import { stringToNumber } from '../methods/stringToNumber'
import { TBill } from '../types/Bill'
import { TCategory } from '../types/Category'
import { useMonthAsString } from '../hooks/useMonthAsString'

export const addBill = async (bill: TBill, selectedCategory?: TCategory) => {
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
  })

  const monthToUpdate = useMonthAsString(bill.date)

  const monthsQuery = query(monthsRef, where('name', '==', monthToUpdate))
  const querySnapshot = await getDocs(monthsQuery)

  if (!querySnapshot.docs.length) {
    await addDoc(monthsRef, {
      name: monthToUpdate,
      bills: [{ ...bill, id: newDocRef.id, products: convertedProducts }],
    })
  }

  querySnapshot.forEach(async (res) => {
    const docToUpdate = res.data()
    const docRef = doc(monthsRef, res.id)
    await updateDoc(docRef, {
      ...docToUpdate,
      bills: [
        ...docToUpdate.bills,
        { ...bill, id: newDocRef.id, products: convertedProducts },
      ],
    })
  })

  bill.products.forEach(async (product) => {
    await updateDoc(doc(productsRef, product.id), {
      category: selectedCategory.name,
    })
  })
}
