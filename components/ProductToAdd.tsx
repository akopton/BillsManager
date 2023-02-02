import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { TBill } from '../types/Bill'
import { TProduct } from '../types/Product'

export const ProductToAdd = ({
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
  const [showFullName, setShowFullName] = useState<boolean>(false)
  const handleProductCount = (count: string) => {
    const updatedProducts = productsList.map((el) => {
      if (product.name === el.name) {
        return {
          ...el,
          count: count,
        }
      } else return el
    })
    setProductsList(updatedProducts)
    setBill({
      ...bill,
      products: updatedProducts,
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
      products: updatedProducts,
    })
  }

  return (
    <View style={styles.product}>
      <Pressable
        style={styles.productName}
        onPress={() => setShowFullName(!showFullName)}
      >
        <Text
          numberOfLines={1}
          style={styles.productText}
        >
          {product.name}
        </Text>
        {showFullName && (
          <View style={styles.productNameTooltip}>
            <View
              style={{
                position: 'absolute',
                height: 8,
                width: 8,
                bottom: -3,
                left: 5,
                backgroundColor: 'white',
                transform: [{ rotate: '45deg' }],
                zIndex: -1,
              }}
            ></View>
            <View
              style={{
                zIndex: 1,
                backgroundColor: 'white',
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 6,
              }}
            >
              <Text
                numberOfLines={1}
                style={{ width: '100%' }}
              >
                {product.name}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
      <View style={styles.inputsContainer}>
        <TextInput
          keyboardType="numeric"
          style={[styles.input, styles.countInput, styles.productText]}
          onChangeText={handleProductCount}
          value={product.count ? product.count.toString() : ''}
          placeholder={'0'}
        />
        <TextInput
          keyboardType="numeric"
          style={[styles.input, styles.productText, styles.valueInput]}
          onChangeText={handleProductValue}
          value={product.value ? product.value.toString() : ''}
          placeholder={'0 zł'}
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
    paddingTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  productText: {
    fontSize: 20,
  },
  productName: {
    flexBasis: '42%',
    position: 'relative',
  },
  productNameTooltip: {
    position: 'absolute',
    top: -25,
  },
  inputsContainer: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 2,
    textAlign: 'center',
    padding: 5,
    borderColor: '#aaa',
    marginLeft: 15,
  },
  countInput: {
    width: 35,
  },
  valueInput: {
    width: 100,
  },
})
