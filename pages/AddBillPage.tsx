import { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { AddBillForm } from '../components/AddBillForm'

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
        />
      )}
    </View>
  )
}
