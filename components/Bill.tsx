import { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { handleFirstCapitalLetter } from '../methods/handleFirstCapitalLetter'
import { numberToString } from '../methods/numberToString'
import { TBill } from '../types/Bill'

export const Bill = (props: any) => {
  //TODO press bill to show its content, longpress bill to show modal with additional actions

  return (
    <TouchableOpacity
      style={styles.billContainer}
      onPress={() => {
        props.navigation.navigate('BillPage', props.bill)
      }}
      onLongPress={() => console.log(props.bill.value)}
    >
      <Text>{props.bill.name}</Text>
      <Text>{numberToString(props.bill.value)} zł</Text>
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
