import { useEffect, useMemo, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../styles/global'
import { Picker, onOpen } from 'react-native-actions-sheet-picker'
import {
  addDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { TCategory } from '../types/Category'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TProduct } from '../types/Product'
import { sumValues } from '../methods/sumValues'
import { ProductToAdd } from './ProductToAdd'
import { billsRef, categoriesRef, productsRef } from '../firebase/index'
import { useQuery } from '../hooks/useQuery'
import { TBill } from '../types/Bill'
import { stringToNumber } from '../methods/stringToNumber'
import { increment, remove } from 'firebase/database'
import { addBill } from '../firebase/addBill'

const initialBill: TBill = {
  name: '',
  category: '',
  value: 0,
  products: [],
  paymentDate: new Date().getTime(),
  addedAt: new Date().getTime(),
}

export const AddBillForm = ({ setAddingNewBill, navigation }: any) => {
  const [categories, setCategories] = useState<TCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<TCategory>()
  const [searchValue, setSearchValue] = useState<string>('')
  const [products, setProducts] = useState<TProduct[]>([])
  const [productsList, setProductsList] = useState<TProduct[]>([])
  const [bill, setBill] = useState<TBill>(initialBill)
  const [billName, setBillName] = useState<string>()
  const [billSumValue, setBillSumValue] = useState<string>('0,00')
  const [paymentDate, setPaymentDate] = useState<Date>(new Date())
  const [correct, setCorrect] = useState<boolean>(false)

  const handleBillName = (name: string) => {
    setBillName(name)
    setBill({ ...bill, name: name })
  }

  const handleSelectedCategory = (category: TCategory) => {
    setSelectedCategory(category)
    setBill({ ...bill, category: category.name })
  }

  const handleSelectedProduct = (product: TProduct) => {
    const newProductsList = [...productsList, product]
    setProductsList(newProductsList)
    setBill({ ...bill, products: newProductsList })

    if (productsList.some((el) => el.name === product.name)) {
      const newProductsList = productsList.filter(
        (el) => el.name !== product.name
      )
      setProductsList(newProductsList)
      setBill({ ...bill, products: newProductsList })
      return
    }
  }

  const productsSumValue = useMemo(() => {
    setBill({ ...bill, value: stringToNumber(sumValues(productsList)) })
    return sumValues(productsList)
  }, [productsList])

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate
    setPaymentDate(currentDate)
    setBill({ ...bill, paymentDate: currentDate.getTime() })
  }

  const onSearch = (text: string) => {
    setSearchValue(text)
  }

  const handleAddBill = async () => {
    if (bill.products?.some((el) => !el.value)) {
      alert('Proszę podać kwoty wybranych produktów!')
      return
    }

    if (bill.name === '') {
      alert('Proszę podać nazwę dla paragonu!')
      return
    }

    setAddingNewBill(true)
    await addBill(bill, selectedCategory).then(() => {
      navigation.goBack()
      setAddingNewBill(false)
    })
  }

  const handleBillValue = (value: string) => {
    if (productsList.length) {
      setBillSumValue('0,00')
      return
    }
    setBillSumValue(value)
    setBill({ ...bill, value: stringToNumber(value) })
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
      const [result] = productsList.filter(
        (el: TProduct) => !newProducts.includes(el)
      )
      const newProductsList = productsList.filter(
        (product: TProduct) => product !== result
      )
      setProductsList(newProductsList)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (bill.name && bill.category && bill.products.length) {
      setCorrect(true)
    }
  }, [bill])

  return (
    <SafeAreaView style={[globalStyles.page, { paddingTop: -20 }]}>
      <View style={{ paddingHorizontal: 20 }}>
        <View>
          <TextInput
            style={[styles.dropdown, styles.btnText, { marginTop: 0 }]}
            placeholder="nazwa"
            value={billName}
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
                productsList.length
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
        {productsList.map((product: TProduct, index: number) => (
          <ProductToAdd
            product={product}
            key={index}
            productsList={productsList}
            setProductsList={setProductsList}
            bill={bill}
            setBill={setBill}
          />
        ))}
      </ScrollView>
      <View style={styles.datePicker}>
        <View>
          <Text style={styles.datePickerLabel}>Data paragonu: </Text>
        </View>
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={paymentDate}
            onChange={onDateChange}
          />
        </View>
      </View>
      <View
        style={[styles.dropdown, { borderColor: correct ? 'green' : '#aaa' }]}
      >
        <TouchableOpacity onPress={handleAddBill}>
          <Text style={styles.btnText}>Dodaj paragon</Text>
        </TouchableOpacity>
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
  datePickerLabel: {
    fontSize: 18,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  productsList: {
    marginTop: 20,
  },
})
