import {
  addDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import {
  billsRef,
  categoriesRef,
  monthsRef,
  productsRef,
  yearsRef,
} from './index'
import { stringToNumber } from '../methods/stringToNumber'
import { TBill } from '../types/Bill'
import { TCategory } from '../types/Category'
import { useMonthAsString } from '../hooks/useMonthAsString'
import { useYearAsString } from '../hooks/useYearAsString'

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

  const monthToUpdate = useMonthAsString(bill.paymentDate)
  const yearToUpdate = useYearAsString(bill.paymentDate)

  const monthsQuery = query(
    monthsRef,
    where('name', '==', monthToUpdate),
    where('years', '==', yearToUpdate)
  )
  const monthsQuerySnapshot = await getDocs(monthsQuery)

  if (!monthsQuerySnapshot.docs.length) {
    await addDoc(monthsRef, {
      name: monthToUpdate,
      year: yearToUpdate,
      bills: [{ ...bill, id: newDocRef.id, products: convertedProducts }],
    })
  }

  monthsQuerySnapshot.forEach(async (res) => {
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

  const yearsQuery = query(yearsRef, where('name', '==', yearToUpdate))
  const yearsQuerySnapshot = await getDocs(yearsQuery)

  if (!yearsQuerySnapshot.docs.length) {
    await addDoc(yearsRef, {
      name: yearToUpdate,
      bills: [{ ...bill, id: newDocRef.id, products: convertedProducts }],
    })
  }

  yearsQuerySnapshot.forEach(async (res) => {
    const docToUpdate = res.data()
    const docRef = doc(yearsRef, res.id)
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
      category: selectedCategory?.name,
    })
  })

  if (!selectedCategory) return
  await updateDoc(doc(categoriesRef, selectedCategory?.id), {
    ...selectedCategory,
    bills: [
      ...selectedCategory.bills,
      { ...bill, id: newDocRef.id, products: convertedProducts },
    ],
  })
}
