import { useEffect } from 'react'
import { Touchable, TouchableOpacity, View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/Feather'
import { addBill } from '../firebase/addBill'
import { TProduct } from '../types/Product'

export const HeaderAddBillBtn = (props: any) => {
  const { bill, selectedCategory, setAddingNewBill, navigation } = props
  const handleAddBill = async () => {
    if (bill.products?.some((el: TProduct) => !el.value)) {
      alert('Proszę podać kwoty wybranych produktów!')
      return
    }

    if (bill.name === '') {
      alert('Proszę podać nazwę dla paragonu!')
      return
    }

    setAddingNewBill(true)
    await addBill(bill, selectedCategory).then(() => {
      navigation.goBack()
      setAddingNewBill(false)
    })
  }

  return (
    <TouchableOpacity onPress={() => handleAddBill()}>
      <FontAwesome5Icon
        name="check-square"
        size={20}
        color="black"
      />
    </TouchableOpacity>
  )
}
