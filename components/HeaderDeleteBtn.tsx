import { Text, TouchableOpacity, Alert } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

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
          onPress: () => deleteItem(props.id),
          style: 'destructive',
        },
      ]
    )

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'bills', id)).then(() => {
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
