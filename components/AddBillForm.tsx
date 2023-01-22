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
import { categoriesRef } from '../firebase/firestore/database'
import { useQuery } from '../hooks/useQuery'

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
