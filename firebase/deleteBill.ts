import { increment } from 'firebase/database'
import {
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { billsRef, categoriesRef, monthNames, monthsRef } from '.'
import { TBill } from '../types/Bill'

export const deleteBill = async (bill: TBill) => {
  const categoriesQuery = query(
    categoriesRef,
    where('name', '==', bill.category)
  )
  const categoriesQuerySnapshot = await getDocs(categoriesQuery)
  categoriesQuerySnapshot.forEach(async (res) => {
    const docToUpdate = res.data()
    const docRef = doc(categoriesRef, docToUpdate.id)

    await updateDoc(docRef, {
      bills: docToUpdate.bills.filter((el: TBill) => el.id !== bill.id),
      value: docToUpdate.value - bill.value,
    })
  })

  const monthId = new Date(bill.date).getMonth()
  const monthToUpdate = monthNames[monthId]

  const monthsQuery = query(monthsRef, where('name', '==', monthToUpdate))
  const monthsQuerySnapshot = await getDocs(monthsQuery)

  monthsQuerySnapshot.forEach(async (res) => {
    const docToUpdate = res.data()
    const docRef = doc(monthsRef, res.id)

    await updateDoc(docRef, {
      bills: docToUpdate.bills.filter((el: TBill) => el.id !== bill.id),
      value: docToUpdate.value - bill.value,
    })
  })

  await deleteDoc(doc(billsRef, bill.id))
}
