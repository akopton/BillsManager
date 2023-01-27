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
import { addDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { TCategory } from '../types/Category'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TProduct } from '../types/Product'
import { sumValues } from '../methods/sumValues'
import { ProductToAdd } from './ProductToAdd'
import { billsRef, categoriesRef, productsRef } from '../firebase/index'
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

export const AddBillForm = ({ setAddingNewBill, navigation }: any) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<TCategory>()
  const [categories, setCategories] = useState<TCategory[]>([])
  const [date, setDate] = useState(new Date())
  const [products, setProducts] = useState<TProduct[]>([])
  const [productsList, setProductsList] = useState<TProduct[]>([])
  const [bill, setBill] = useState<TBill>(initialBill)
  const [billName, setBillName] = useState<string>()
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

  const billSumValue = useMemo(() => {
    setBill({ ...bill, value: stringToNumber(sumValues(productsList)) })
    return sumValues(productsList)
  }, [productsList])

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate
    setDate(currentDate)
    setBill({ ...bill, date: currentDate.getTime() })
  }

  const onSearch = (text: string) => {
    setSearchValue(text)
  }

  const handleAddBill = async () => {
    if (!bill.products.length) {
      alert('Musisz dodać produkty!')
      return
    }

    if (bill.products.some((el) => !el.value)) {
      alert('Proszę podać kwoty wybranych produktów!')
      return
    }

    setAddingNewBill(true)
    const convertedProducts = productsList.map((product) => {
      return {
        ...product,
        count:
          typeof product.count === 'string'
            ? stringToNumber(product.count)
            : product.count,
        value:
          typeof product.value === 'string'
            ? stringToNumber(product.value)
            : product.value,
      }
    })

    await addDoc(billsRef, { ...bill, products: convertedProducts }).then(
      () => {
        navigation.goBack()
        setAddingNewBill(false)
      }
    )
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
      const newProducts: { id?: string; name: string }[] = []
      snapshot.docs.forEach((doc) => {
        newProducts.push({ ...(doc.data() as TProduct), id: doc.id })
      })
      setProducts(
        newProducts.map((el) => ({ name: el.name, count: 1, value: 0 }))
      )
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
    <SafeAreaView
      style={[globalStyles.page, { paddingTop: -20, paddingHorizontal: 70 }]}
    >
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
        <Text style={{ fontSize: 20 }}>
          {billSumValue.replace('.', ',')} zł
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={[styles.dropdown]}
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
            value={date}
            onChange={onDateChange}
            display="default"
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
  },
  productsList: {
    marginTop: 20,
  },
})
