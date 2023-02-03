import { increment } from 'firebase/database'
import {
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { billsRef, categoriesRef, monthsRef, yearsRef } from '.'
import { useMonthAsString } from '../hooks/useMonthAsString'
import { useYearAsString } from '../hooks/useYearAsString'
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
    })
  })

  const monthToUpdate = useMonthAsString(bill.paymentDate)
  const monthsQuery = query(monthsRef, where('name', '==', monthToUpdate))
  const monthsQuerySnapshot = await getDocs(monthsQuery)

  monthsQuerySnapshot.forEach(async (res) => {
    const docToUpdate = res.data()
    const docRef = doc(monthsRef, res.id)

    await updateDoc(docRef, {
      bills: docToUpdate.bills.filter((el: TBill) => el.id !== bill.id),
    })
  })

  const yearToUpdate = useYearAsString(bill.paymentDate)
  const yearsQuery = query(yearsRef, where('name', '==', yearToUpdate))
  const yearsQuerySnapshot = await getDocs(yearsQuery)

  yearsQuerySnapshot.forEach(async (res) => {
    const docToUpdate = res.data()
    const docRef = doc(yearsRef, res.id)

    await updateDoc(docRef, {
      bills: docToUpdate.bills.filter((el: TBill) => el.id !== bill.id),
    })
  })

  await deleteDoc(doc(billsRef, bill.id))
}
