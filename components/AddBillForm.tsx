import { useEffect, useMemo, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../styles/global'
import { Picker, onOpen } from 'react-native-actions-sheet-picker'
import { onSnapshot } from 'firebase/firestore'
import { TCategory } from '../types/Category'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TProduct } from '../types/Product'
import { sumValues } from '../methods/sumValues'
import { ProductToAdd } from './ProductToAdd'
import { categoriesRef, productsRef } from '../firebase/index'
import { useQuery } from '../hooks/useQuery'
import { TBill } from '../types/Bill'
import { stringToNumber } from '../methods/stringToNumber'
import { addBill } from '../firebase/addBill'
import { HeaderAddBillBtn } from './HeaderAddBillBtn'
import { numberToString } from '../methods/numberToString'

export const AddBillForm = ({
  navigation,
  setAddingNewBill,
  initialBill,
}: any) => {
  const [categories, setCategories] = useState<TCategory[]>([])
  const [products, setProducts] = useState<TProduct[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  const [bill, setBill] = useState<TBill>(initialBill)
  const [billSumValue, setBillSumValue] = useState<string>(
    initialBill.value > 0 ? numberToString(initialBill.value) : '0,00'
  )
  const [selectedCategory, setSelectedCategory] = useState<TCategory>()
  const [paymentDate, setPaymentDate] = useState<Date>(new Date())

  const handleBillName = (name: string) => {
    setBill({ ...bill, name: name })
  }

  const handleSelectedCategory = (category: TCategory) => {
    setSelectedCategory(category)
    setBill({ ...bill, category: category.name })
  }

  const handleSelectedProduct = (product: TProduct) => {
    const newProductsList = [...bill.products, product]
    setBill({ ...bill, products: newProductsList })

    if (bill.products.some((el) => el.name === product.name)) {
      const newProductsList = bill.products.filter(
        (el) => el.name !== product.name
      )
      setBill({ ...bill, products: newProductsList })
      return
    }
  }

  const productsSumValue = useMemo(() => {
    setBill({ ...bill, value: stringToNumber(sumValues(bill.products)) })
    return sumValues(bill.products)
  }, [bill.products])

  const onDateChange = (event: any, selectedDate: any) => {
    setPaymentDate(selectedDate)
    setBill({ ...bill, paymentDate: selectedDate.getTime() })
  }

  const onSearch = (text: string) => {
    setSearchValue(text)
  }

  const handleBillValue = (value: string) => {
    if (bill.products.length) {
      setBillSumValue('0,00')
      return
    }
    setBillSumValue(value)
    setBill({ ...bill, value: stringToNumber(value) })
  }

  const handleSwitch = () => {
    setBill({ ...bill, isPaid: !bill.isPaid })
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(categoriesRef, (snapshot) => {
      const newCategories: any[] = []
      snapshot.docs.forEach((doc) => {
        newCategories.push({ ...(doc.data() as TCategory), id: doc.id })
      })
      setCategories(newCategories)
      setSelectedCategory(undefined)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderAddBillBtn
          bill={bill}
          selectedCategory={selectedCategory}
          setAddingNewBill={setAddingNewBill}
          navigation={navigation}
        />
      ),
    })
  }, [bill])

  useEffect(() => {
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const newProducts: TProduct[] = []
      snapshot.docs.forEach((doc) => {
        newProducts.push({
          ...(doc.data() as { name: string }),
          id: doc.id,
          count: 1,
          value: 0,
        })
      })
      setProducts(newProducts)
      const [result] = bill.products.filter(
        (el: TProduct) => !newProducts.includes(el)
      )
      const newProductsList = bill.products.filter(
        (product: TProduct) => product !== result
      )
      setBill({ ...bill, products: newProductsList })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <SafeAreaView style={[globalStyles.page, { paddingTop: -20 }]}>
      <View style={{ paddingHorizontal: 20 }}>
        <View>
          <TextInput
            style={[styles.dropdown, styles.btnText, { marginTop: 0 }]}
            placeholder="nazwa"
            value={bill.name}
            onChangeText={handleBillName}
          />
        </View>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            // paddingHorizontal: 35,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 20 }}>Suma:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <TextInput
              keyboardType="numeric"
              onChangeText={handleBillValue}
              value={
                bill.products.length
                  ? productsSumValue.replace('.', ',')
                  : billSumValue
              }
              style={{ fontSize: 20 }}
            />
            <Text style={{ fontSize: 20 }}>zł</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={[styles.dropdown]}
            onPress={() => {
              onOpen('Category')
            }}
          >
            <Text style={styles.btnText}>
              {selectedCategory && selectedCategory !== undefined
                ? `${selectedCategory?.name}`
                : 'Wybierz kategorię'}
            </Text>
          </TouchableOpacity>
          <Picker
            id="Category"
            data={useQuery(categories, searchValue)}
            inputValue={searchValue}
            searchable={true}
            label="Wybierz kategorię"
            setSelected={handleSelectedCategory}
            onSearch={onSearch}
            noDataFoundText={'Nie znaleziono'}
            placeholderText={'Szukaj'}
            closeText={'Zamknij'}
            actionsSheetProps={{
              children: null,
              keyboardDismissMode: 'interactive',
              onClose: () => setSearchValue(''),
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={[styles.dropdown]}
            onPress={() => {
              onOpen('Product')
            }}
          >
            <Text style={styles.btnText}>{'Wybierz produkty'}</Text>
          </TouchableOpacity>
          <Picker
            id="Product"
            data={useQuery(products, searchValue)}
            inputValue={searchValue}
            searchable={true}
            label="Wybierz produkt"
            setSelected={handleSelectedProduct}
            onSearch={onSearch}
            noDataFoundText={'Nie znaleziono'}
            placeholderText={'Szukaj'}
            closeText={'Zamknij'}
            actionsSheetProps={{
              children: null,
              keyboardDismissMode: 'interactive',
              onClose: () => setSearchValue(''),
            }}
          />
        </View>
      </View>
      <ScrollView style={styles.productsList}>
        {bill.products.map((product: TProduct, index: number) => (
          <ProductToAdd
            product={product}
            key={index}
            // productsList={bill.products}
            // setProductsList={setProductsList}
            bill={bill}
            setBill={setBill}
          />
        ))}
      </ScrollView>
      <View style={styles.paymentSwitch}>
        <Text style={styles.label}>
          {bill.isPaid ? 'Zapłacony' : 'Do zapłaty'}
        </Text>
        <Switch
          value={bill.isPaid}
          onValueChange={handleSwitch}
        />
      </View>
      <View style={styles.datePicker}>
        <View>
          <Text style={styles.label}>Data paragonu: </Text>
        </View>
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={paymentDate}
            onChange={onDateChange}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    borderWidth: 3,
    borderColor: '#aaa',
    borderRadius: 15,
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#000000',
  },
  label: {
    fontSize: 18,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  productsList: {
    marginTop: 20,
  },
  paymentSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})
