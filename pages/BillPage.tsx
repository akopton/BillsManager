import { View, Text, StyleSheet, PixelRatio } from 'react-native'

export const BillPage = ({ route }: any) => {
  const bill = route.params

  return (
    <View style={{ position: 'relative' }}>
      {/* <Text>{bill.value.toString()}</Text> */}
      <View style={styles.circleChart}></View>
      <View style={styles.filler}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  circleChart: {
    height: 300,
    width: 300,
    borderWidth: 20,
    borderRadius: 600,
    position: 'absolute',
  },
  filler: {
    position: 'absolute',
    top: 5,
    left: 5,
    height: 290,
    width: 290,
    borderWidth: 10,
    borderRadius: 580,
    borderColor: 'red',
  },
})
