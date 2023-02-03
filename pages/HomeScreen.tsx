import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { billsRef, yearsRef } from '../firebase'
import { onSnapshot } from 'firebase/firestore'
import { TBill } from '../types/Bill'
import { TYear } from '../types/Year'
import { CustomDropdown } from '../components/CustomDropdown'

// wyświetla wszystkie miesiące z danego roku

export const HomeScreen = ({ route, navigation }: any) => {
  const [years, setYears] = useState<TYear[]>([])
  const [loadingBills, setLoadingBills] = useState<boolean>(false)
  const [billsList, setBillsList] = useState<TBill[]>([])
  // const [categories, setCategories] = useState<TCategory[]>([])
  // const [filterValue, setFilterValue] = useState<string>()
  // const [popup, setPopup] = useState<{ show: boolean; content: unknown }>({
  //   show: false,
  //   content: {},
  // })

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

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(categoriesRef, (snapshot) => {
  //     const newCategories: TCategory[] = []
  //     snapshot.docs.forEach((doc) => {
  //       newCategories.push({ ...(doc.data() as TCategory), id: doc.id })
  //     })
  //     setCategories(newCategories)
  //   })

  //   return () => {
  //     unsubscribe()
  //   }
  // }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(yearsRef, (snapshot) => {
      const newYears: TYear[] = []
      snapshot.docs.forEach((doc) => {
        newYears.push({ ...(doc.data() as TYear), id: doc.id })
      })
      setYears(newYears)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // const handleFilterValue = (category: string) => {
  //   if (filterValue === category) {
  //     setFilterValue(undefined)
  //     return
  //   }
  //   setFilterValue(category)
  // }

  // const filteredBills = useMemo(() => {
  //   return filterValue
  //     ? billsList.filter((el) => el.category === filterValue)
  //     : billsList
  // }, [billsList, filterValue])

  return (
    <View>
      <View style={styles.billsToPay}>
        {billsList.map((bill: TBill, id: number) => (
          <View key={id}>
            <Text>{bill.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.yearsList}>
        <View>
          {years.map((year: TYear, id: number) => {
            if (year.name === new Date().getFullYear().toString()) {
              return (
                <CustomDropdown
                  key={id}
                  title={year.name}
                  data={[{ name: 'el' }]}
                  opened
                />
              )
            }

            return (
              <CustomDropdown
                key={id}
                data={[{ name: 'el' }]}
                title={year.name}
              />
            )
          })}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  billsToPay: {},
  yearsList: {},
})

{
  /* <View style={[globalStyles.page, { paddingHorizontal: 20 }]}>
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
                bill={item}
                key={index}
                navigation={navigation}
                setPopup={setPopup}
              />
            )}
          />
        )}
      </View>
      {popup.show && (
        <CustomPopup
          popup={popup}
          setPopup={setPopup}
          content={popup.content}
        />
      )}
    </View> */
}
