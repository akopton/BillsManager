import React, { useEffect, useMemo, useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import { globalStyles } from '../styles/global'
import { auth, billsRef, categoriesRef } from '../firebase'
import { onSnapshot } from 'firebase/firestore'
import { TBill } from '../types/Bill'
import { numberToString } from '../methods/numberToString'
import { TCategory } from '../types/Category'
import { CustomSearchBar } from '../components/CustomSearchBar'
import { Bill } from '../components/Bill'

// wyświetla wszystkie miesiące z danego roku

export const HomeScreen = ({ route, navigation }: any) => {
  const [loadingBills, setLoadingBills] = useState<boolean>(false)
  const [billsList, setBillsList] = useState<TBill[]>([])
  const [categories, setCategories] = useState<TCategory[]>([])
  const [filterValue, setFilterValue] = useState<string>()

  useEffect(() => {
    setLoadingBills(true)
    const unsubscribe = onSnapshot(billsRef, (snapshot) => {
      const newBills: TBill[] = []
      snapshot.docs.forEach((doc) => {
        newBills.push({ ...(doc.data() as TBill), id: doc.id })
      })
      setBillsList(newBills)
      setLoadingBills(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

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

  const handleFilterValue = (category: string) => {
    console.log(category)
    if (filterValue === category) {
      setFilterValue(undefined)
      return
    }
    setFilterValue(category)
  }

  const filteredBills = useMemo(() => {
    return filterValue
      ? billsList.filter((el) => el.category === filterValue)
      : billsList
  }, [billsList, filterValue])

  return (
    <View style={[globalStyles.page, { paddingHorizontal: 20 }]}>
      <View>
        <CustomSearchBar
          arr={categories}
          filterValue={filterValue}
          handleFilterValue={handleFilterValue}
        />
      </View>
      <View style={{ paddingHorizontal: 30, marginTop: 20, height: '90%' }}>
        {loadingBills ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <FlatList
            data={filteredBills}
            renderItem={({ item, index }: { item: TBill; index: number }) => (
              <Bill
                item={item}
                key={index}
              />
            )}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    borderBottomColor: '#000000',
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
})
