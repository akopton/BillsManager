import { useContext, useEffect, useMemo, useState } from 'react'
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  DatePickerIOSComponent,
  Platform,
  Button,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../styles/global'
import { Picker, onOpen } from 'react-native-actions-sheet-picker'
import { removePolishLetters } from '../methods/removePolishLetters'
// import { db } from '../firebase'
import {
  query,
  collection,
  getDocs,
  where,
  getFirestore,
  getDoc,
  onSnapshot,
} from 'firebase/firestore'
import { auth } from '../firebase/auth/firebase'
import { getCategories } from '../firebase/firestore/getCategories'
import { TBill } from '../types/Bill'
import { TCategory } from '../types/Category'
import { sortByName } from '../methods/sortByName'
import { enableLogging } from 'firebase/database'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TProduct } from '../types/Product'
import { sumValues } from '../methods/sumValues'
// node_modules\react-native-actions-sheet-picker\src\components\Picker.tsx

export const AddBillForm = () => {
  const [query, setQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<any>()
  const [categories, setCategories] = useState<TCategory[]>([])
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [products, setProducts] = useState<any>([
    { name: 'mleko', value: 1 },
    { name: 'olej', value: 3 },
    { name: 'jogurt', value: 0 },
  ])
  const [productsList, setProductsList] = useState<TProduct[]>([])

  const handleSelectedProduct = (product: TProduct) => {
    setProductsList([...productsList, product])

    if (productsList.includes(product)) {
      const newProductsList = productsList.filter((el) => el !== product)
      setProductsList(newProductsList)
      return
    }
  }

  const billSumValue = useMemo(() => {
    return sumValues(productsList)
  }, [productsList])

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  const onSearch = (text: string) => {
    setQuery(text)
  }

  const filteredCategories: any = useMemo(() => {
    sortByName(categories)
    return categories?.filter((el: TCategory) =>
      removePolishLetters(el.name).includes(removePolishLetters(query))
    )
  }, [categories, query])

  const filteredProducts: any = useMemo(() => {
    sortByName(products)
    return products.filter((el: { name: string }) =>
      removePolishLetters(el.name).includes(removePolishLetters(query))
    )
  }, [products, query])

  useEffect(() => {
    getCategories().then((snapshot) => {
      const newCategories: TCategory[] = []
      snapshot.docs.forEach((doc) =>
        newCategories.push({ ...(doc.data() as TCategory), id: doc.id })
      )
      setCategories(newCategories)
    })
  }, [])

  useEffect(() => {
    const db = getFirestore()
    const collectionRef = collection(db, 'categories')
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const snapshotCategories: TCategory[] = []
      snapshot.docs.forEach((doc) => {
        snapshotCategories.push({ ...(doc.data() as TCategory), id: doc.id })
      })
      setCategories(snapshotCategories)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <SafeAreaView style={globalStyles.page}>
      <View>
        <Text>{billSumValue} zł</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            onOpen('Category')
          }}
        >
          <Text style={styles.selectedItem}>
            {selectedCategory
              ? `${selectedCategory?.name}`
              : 'Wybierz kategorię'}
          </Text>
        </TouchableOpacity>
        <Picker
          id="Category"
          data={filteredCategories}
          inputValue={query}
          searchable={true}
          label="Wybierz kategorię"
          setSelected={setSelectedCategory}
          onSearch={onSearch}
          noDataFoundText={'Nie znaleziono'}
          placeholderText={'Szukaj'}
          closeText={'Zamknij'}
          actionsSheetProps={{
            children: null,
            keyboardDismissMode: 'interactive',
            onClose: () => setQuery(''),
          }}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            onOpen('Product')
          }}
        >
          <Text style={styles.selectedItem}>{'Wybierz produkty'}</Text>
        </TouchableOpacity>
        <Picker
          id="Product"
          data={filteredProducts}
          inputValue={query}
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
            onClose: () => setQuery(''),
          }}
        />
      </View>
      <View>
        {productsList.map((product: TProduct, index: number) => (
          <View key={index}>
            <Text>{product.name}</Text>
          </View>
        ))}
      </View>
      <View>
        <Text>Data: {date.toLocaleString()}</Text>
        {/* <TouchableOpacity onPress={showDatePicker}>
          <Text>Ustaw datę</Text>
        </TouchableOpacity> */}
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          onChange={onChange}
          display="default"
          // positiveButton={{ label: 'OK', textColor: 'green' }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 250,
    maxWidth: 250,
    borderWidth: 2,
    borderColor: '#aaa',
    alignSelf: 'center',
  },
  selectedItem: {
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: '#000000',
  },
})
