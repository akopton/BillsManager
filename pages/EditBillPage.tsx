import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { AddBillForm } from '../components/AddBillForm'
import { TBill } from '../types/Bill'

export const EditBillPage = ({ route, navigation }: any) => {
  const [addingNewBill, setAddingNewBill] = useState<boolean>(false)
  const bill: TBill = route.params
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
          initialBill={bill}
        />
      )}
    </View>
  )
}
