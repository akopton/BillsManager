import {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
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
  ScrollView,
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
import { Product } from './Product'
// node_modules\react-native-actions-sheet-picker\src\components\Picker.tsx

export const AddBillForm = () => {
  const [query, setQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<any>()
  const [categories, setCategories] = useState<TCategory[]>([])
  const [date, setDate] = useState(new Date())
  const [products, setProducts] = useState<any>([
    { name: 'mleko', count: 1, value: 0 },
    { name: 'olej', count: 1, value: 0 },
    { name: 'jogurt', count: 1, value: 0 },
  ])
  const [productsList, setProductsList] = useState<TProduct[]>([])

  const handleSelectedProduct = (product: TProduct) => {
    setProductsList([...productsList, product])

    if (productsList.some((el) => el.name === product.name)) {
      const newProductsList = productsList.filter(
        (el) => el.name !== product.name
      )
      setProductsList(newProductsList)
      return
    }
  }

  const billSumValue = useMemo(() => {
    return sumValues(productsList)
  }, [productsList])

  const onDateChange = (event: any, selectedDate: any) => {
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

  useEffect(() => {
    console.log(productsList)
  }, [productsList])

  return (
    <SafeAreaView style={globalStyles.page}>
      <View>
        <Text>{billSumValue.replace('.', ',')} zł</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            onOpen('Category')
          }}
        >
          <Text style={styles.btnText}>
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
          <Text style={styles.btnText}>{'Wybierz produkty'}</Text>
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
      <ScrollView style={styles.productsList}>
        {productsList.map((product: TProduct, index: number) => (
          <Product
            product={product}
            key={index}
            productsList={productsList}
            setProductsList={setProductsList}
          />
        ))}
      </ScrollView>
      <View style={styles.datePicker}>
        <View>
          <Text>Data paragonu: </Text>
        </View>
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            onChange={onDateChange}
            display="default"
          />
        </View>
      </View>
      <View style={styles.dropdown}>
        <TouchableOpacity>
          <Text style={styles.btnText}>dodaj paragon</Text>
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
    minWidth: 250,
    maxWidth: 250,
    borderWidth: 2,
    borderColor: '#aaa',
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
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productsList: {
    marginTop: 20,
  },
})
