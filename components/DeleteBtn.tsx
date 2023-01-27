import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { FaBeer } from 'react-icons/fa'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { useState } from 'react'

export const DeleteBtn = (props: any) => {
  //TODO deleting item based on document id

  const createTwoButtonAlert = () =>
    Alert.alert(
      `Deleting bill ${props.name}.`,
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('elo'),
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
      <Text>
        <FontAwesome5
          name={'trash-alt'}
          solid
          size={20}
        />
      </Text>
    </TouchableOpacity>
  )
}
