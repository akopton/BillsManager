import { increment } from 'firebase/database'
import {
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { billsRef, categoriesRef, db, productsRef } from '.'
import { TBill } from '../types/Bill'

export const deleteBill = async (bill: TBill) => {
  const q = query(categoriesRef, where('name', '==', bill.category))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(async (res) => {
    const newDoc = res.data()
    const docRef = doc(categoriesRef, newDoc.id)

    await updateDoc(docRef, {
      bills: newDoc.bills.filter((el: TBill) => el.id !== bill.id),
      value: newDoc.value - bill.value,
    })
  })

  await deleteDoc(doc(billsRef, bill.id))
}
