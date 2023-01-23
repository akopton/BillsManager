import { useEffect, useMemo, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../styles/global'
import { Picker, onOpen } from 'react-native-actions-sheet-picker'
import { onSnapshot } from 'firebase/firestore'
import { TCategory } from '../types/Category'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TProduct } from '../types/Product'
import { sumValues } from '../methods/sumValues'
import { Product } from './Product'
import { categoriesRef, productsRef } from '../firebase/firestore/database'
import { useQuery } from '../hooks/useQuery'
import { TBill } from '../types/Bill'
import { stringToNumber } from '../methods/stringToNumber'

const initialBill: TBill = {
  name: '',
  category: '',
  value: 0,
  products: [],
  date: new Date(),
}

export const AddBillForm = () => {
  const [query, setQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<TCategory>()
  const [categories, setCategories] = useState<TCategory[]>([])
  const [date, setDate] = useState(new Date())
  const [products, setProducts] = useState<TProduct[]>([])
  const [productsList, setProductsList] = useState<TProduct[]>([])
  const [bill, setBill] = useState<TBill>(initialBill)

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

  const billSumValue = useMemo(() => {
    setBill({ ...bill, value: stringToNumber(sumValues(productsList)) })
    return sumValues(productsList)
  }, [productsList])

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate
    setDate(currentDate)
    setBill({ ...bill, date: currentDate })
  }

  const onSearch = (text: string) => {
    setQuery(text)
  }

  const handleAddBill = () => {
    if (bill.products.some((el) => isNaN(el.count) || el.count < 1)) return
    if (bill.products.some((el) => isNaN(el.value) || el.value < 1)) return
    console.log(bill)
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(categoriesRef, (snapshot) => {
      const newCategories: TCategory[] = []
      snapshot.docs.forEach((doc) => {
        newCategories.push({ ...(doc.data() as TCategory), id: doc.id })
      })
      setCategories(newCategories)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // get recently added products
  useEffect(() => {
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const newProducts: TProduct[] = []
      snapshot.docs.forEach((doc) => {
        newProducts.push({ ...(doc.data() as TProduct), id: doc.id })
      })
      setProducts(newProducts)
    })

    return () => {
      unsubscribe()
    }
  }, [])

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
          data={useQuery(categories, query)}
          inputValue={query}
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
          data={useQuery(products, query)}
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
            value={date}
            onChange={onDateChange}
            display="default"
          />
        </View>
      </View>
      <View style={styles.dropdown}>
        <TouchableOpacity onPress={handleAddBill}>
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
  datePickerLabel: {
    fontSize: 18,
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
