import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { AddBillForm } from '../components/AddBillForm'
import { addBill } from '../firebase/addBill'
import { TBill } from '../types/Bill'
import { TCategory } from '../types/Category'
import { TProduct } from '../types/Product'
const initialBill: TBill = {
  name: '',
  category: '',
  value: 0,
  products: [],
  paymentDate: new Date().getTime(),
  addedAt: new Date().getTime(),
  isPaid: true,
}
export const AddBillPage = ({ route, navigation }: any) => {
  const [addingNewBill, setAddingNewBill] = useState<boolean>(false)

  return (
    <View>
      {addingNewBill ? (
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      ) : (
        <AddBillForm
          setAddingNewBill={setAddingNewBill}
          navigation={navigation}
          initialBill={initialBill}
        />
      )}
    </View>
  )
}
