import { Text, TouchableOpacity, Alert } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { deleteBill } from '../firebase/deleteBill'
import { TBill } from '../types/Bill'

export const HeaderDeleteBtn = (props: any) => {
  const createTwoButtonAlert = () =>
    Alert.alert(
      `Deleting bill ${props.name}.`,
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteBill(props),
          style: 'destructive',
        },
      ]
    )

  const handleDeleteBill = async (bill: TBill) => {
    await deleteBill(bill).then(() => {
      props.navigation.replace('HomeScreen')
    })
  }

  return (
    <TouchableOpacity onPress={createTwoButtonAlert}>
      <FontAwesome5
        name={'trash-alt'}
        solid
        size={20}
      />
    </TouchableOpacity>
  )
}
