import { View, Text } from 'react-native'

export const BillPage = ({ route }: any) => {
  const bill = route.params

  return (
    <View>
      <Text>{bill.value.toString()}</Text>
    </View>
  )
}
