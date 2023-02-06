import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDate } from '../hooks/useDate'
import { numberToString } from '../methods/numberToString'

export const Bill = (props: any) => {
  const dateToShow = useDate(props.bill.paymentDate)

  return (
    <TouchableOpacity
      style={styles.billContainer}
      onPress={() => {
        props.navigation.navigate('BillPage', props.bill)
      }}
      onLongPress={() => props.setPopup({ show: true, content: props.bill })}
    >
      <Text>{props.bill.name}</Text>
      <Text>{dateToShow}</Text>
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
    justifyContent: 'space-around',
    borderWidth: 2,
    borderColor: '#aaa',
    borderRadius: 10,
    marginBottom: 10,
  },
  billName: {},
  billValue: {},
})
