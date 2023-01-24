import { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { handleFirstCapitalLetter } from '../methods/handleFirstCapitalLetter'
import { numberToString } from '../methods/numberToString'
import { TBill } from '../types/Bill'

export const Bill = (props: any) => {
  return (
    <TouchableOpacity
      style={styles.billContainer}
      onPress={() => console.log(props.item.name)}
      onLongPress={() => console.log(props.item.value)}
    >
      <Text>{props.item.name}</Text>
      <Text>{numberToString(props.item.value)} zł</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  billContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#aaa',
    borderRadius: 10,
    marginBottom: 10,
  },
  billName: {},
  billValue: {},
})
