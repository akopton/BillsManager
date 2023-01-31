import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { numberToString } from '../methods/numberToString'

export const Bill = (props: any) => {
  //TODO press bill to show its content, longpress bill to show modal with additional actions

  return (
    <TouchableOpacity
      style={styles.billContainer}
      onPress={() => {
        props.navigation.navigate('BillPage', props.bill)
      }}
      onLongPress={() => props.setPopup({ show: true, content: props.bill })}
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
