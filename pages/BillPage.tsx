import { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export const BillPage = ({ route }: any) => {
  const bill = route.params

  return (
    <View>
      <Text>{bill.value.toString()}</Text>
    </View>
  )
}
