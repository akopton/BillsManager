import { View, Text, StyleSheet, TextInput } from 'react-native'
import { stringToNumber } from '../methods/stringToNumber'
import { TBill } from '../types/Bill'
import { TProduct } from '../types/Product'

export const Product = ({
  product,
  productsList,
  setProductsList,
  bill,
  setBill,
}: {
  product: TProduct
  productsList: any[]
  setProductsList: any
  bill: TBill
  setBill: any
}) => {
  const handleProductCount = (count: string) => {
    const updatedProducts = productsList.map((el) => {
      if (product.name === el.name) {
        return { ...product, count: count }
      } else return el
    })
    setProductsList(updatedProducts)
    setBill({
      ...bill,
      products: updatedProducts.map((product: TProduct) => {
        return {
          ...product,
          count: typeof count === 'string' ? stringToNumber(count) : count,
        }
      }),
    })
  }

  const handleProductValue = (value: string) => {
    const updatedProducts = productsList.map((el) => {
      if (product.name === el.name) {
        return { ...product, value: value }
      } else return el
    })
    setProductsList(updatedProducts)
    setBill({
      ...bill,
      products: updatedProducts.map((product: TProduct) => {
        return {
          ...product,
          value: typeof value === 'string' ? stringToNumber(value) : value,
        }
      }),
    })
  }

  return (
    <View style={styles.product}>
      <View>
        <Text style={styles.productText}>{product.name}</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          keyboardType="numeric"
          style={[styles.input, styles.countInput, styles.productText]}
          onChangeText={handleProductCount}
          value={product.count.toString()}
          placeholder={'0'}
        />
        <TextInput
          keyboardType="numeric"
          style={[styles.input, styles.productText, styles.valueInput]}
          onChangeText={handleProductValue}
          value={product.value.toString()}
          placeholder={'0'}
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
