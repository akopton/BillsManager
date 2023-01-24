import { TouchableOpacity, Text } from 'react-native'

export const AddBillBtn = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('AddBillPage')}>
      <Text>Nowy rachunek</Text>
    </TouchableOpacity>
  )
}
