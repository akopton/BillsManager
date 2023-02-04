import { TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { addBill } from '../firebase/addBill'
import { TProduct } from '../types/Product'

export const HeaderNewBillBtn = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('AddBillPage')}>
      <Entypo
        name="new-message"
        size={20}
      />
    </TouchableOpacity>
  )
}
