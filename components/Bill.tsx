import { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { handleFirstCapitalLetter } from '../methods/handleFirstCapitalLetter'
import { TBill } from '../types/Bill'

export const Bill = ({
  props,
  navigation,
}: {
  props: TBill
  navigation: any
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => console.log(props.name)}
    >
      <View>
        <Text style={styles.text}>{handleFirstCapitalLetter(props.name)}</Text>
      </View>
      <View>
        <Text style={styles.text}>{props.value.toFixed(2)}zł</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 30,
  },
})
