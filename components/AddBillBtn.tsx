import { TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

export const AddBillBtn = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('AddBillPage')}>
      <Entypo
        name="new-message"
        size={20}
      />
    </TouchableOpacity>
  )
}
