import { Dispatch, DispatchWithoutAction } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInputComponent,
  TextInput,
} from 'react-native'
import { TProduct } from '../types/Product'

export const Product = ({
  product,
  productsList,
  setProductsList,
}: {
  product: TProduct
  productsList: any[]
  setProductsList: any
}) => {
  const handleProductCount = (count: string) => {
    const updatedProducts = productsList.map((el) => {
      if (product.name === el.name) {
        return { ...product, count: count }
      } else return el
    })
    setProductsList(updatedProducts)
  }

  const handleProductValue = (value: string) => {
    const updatedProducts = productsList.map((el) => {
      if (product.name === el.name) {
        return { ...product, value: value }
      } else return el
    })
    setProductsList(updatedProducts)
  }

  return (
    <View style={styles.product}>
      <View>
        <Text style={styles.productText}>{product.name}</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          nativeID="count"
          keyboardType="numeric"
          style={[styles.input, styles.countInput, styles.productText]}
          onChangeText={handleProductCount}
          value={product.count.toString()}
        />
        <TextInput
          nativeID="value"
          keyboardType="numeric"
          style={[styles.input, styles.productText, styles.valueInput]}
          onChangeText={handleProductValue}
          value={product.value.toString()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  productText: {
    fontSize: 20,
  },
  inputsContainer: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 2,
    textAlign: 'center',
    padding: 5,
    borderColor: 'black',
    marginLeft: 15,
  },
  countInput: {
    width: 35,
  },
  valueInput: {
    width: 100,
  },
})
