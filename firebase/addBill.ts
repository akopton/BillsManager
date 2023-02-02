import {
  addDoc,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import {
  billsRef,
  categoriesRef,
  monthNames,
  monthsRef,
  productsRef,
} from './index'
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

  const newCategoryValue = bill.value + selectedCategory.value
  newCategoryValue.toFixed(2)

  await updateDoc(doc(categoriesRef, selectedCategory?.id), {
    ...selectedCategory,
    bills: [
      ...selectedCategory.bills,
      { ...bill, id: newDocRef.id, products: convertedProducts },
    ],
    value: newCategoryValue,
  })

  const monthId = new Date(bill.date).getMonth()
  const monthToUpdate = monthNames[monthId]

  const monthsQuery = query(monthsRef, where('name', '==', monthToUpdate))
  const querySnapshot = await getDocs(monthsQuery)

  // TODO: adding and deleting months is working, think about handling values of collection in database?????

  if (!querySnapshot.docs.length) {
    const newValue = bill.value
    await addDoc(monthsRef, {
      name: monthToUpdate,
      bills: [{ ...bill, id: newDocRef.id, products: convertedProducts }],
      value: newValue,
    })
  }

  querySnapshot.forEach(async (res) => {
    const docToUpdate = res.data()
    const docRef = doc(monthsRef, res.id)
    const newValue = docToUpdate.value + bill.value
    newValue.toFixed(2)
    await updateDoc(docRef, {
      ...docToUpdate,
      bills: [
        ...docToUpdate.bills,
        { ...bill, id: newDocRef.id, products: convertedProducts },
      ],
      value: newValue,
    })
  })

  bill.products.forEach(async (product) => {
    await updateDoc(doc(productsRef, product.id), {
      category: selectedCategory.name,
    })
  })
}
