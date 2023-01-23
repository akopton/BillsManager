import React, { useEffect, useState } from 'react'
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
import { signOut } from 'firebase/auth'
import { auth, billsRef, categoriesRef } from '../firebase'
import { onSnapshot } from 'firebase/firestore'
import { TBill } from '../types/Bill'
import { numberToString } from '../methods/numberToString'
import { Bill } from '../components/Bill'
import { TCategory } from '../types/Category'

// wyświetla wszystkie miesiące z danego roku

export const HomeScreen = ({ route, navigation }: any) => {
  const [loadingBills, setLoadingBills] = useState<boolean>(false)
  const [billsList, setBillsList] = useState<TBill[]>([])
  const [categories, setCategories] = useState<TCategory[]>([])
  const [filterValue, setFilterValue] = useState<string>()

  const handleLogOut = () => {
    signOut(auth)
      .then(() => navigation.replace('LoginPage'))
      .catch(() => alert('Wystąpił błąd.'))
  }

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

    setFilterValue(category)
  }

  return (
    <View style={[globalStyles.page]}>
      <View>
        <ScrollView
          horizontal={true}
          style={{
            padding: 0,
            borderWidth: 1,
            borderColor: 'red',
            flexDirection: 'row',
          }}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((el, id) => {
            return (
              <TouchableOpacity
                key={id}
                style={{ marginRight: 20 }}
                onPress={() => handleFilterValue(el.name)}
              >
                <Text>{el.name}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.topNav}>
        <TouchableOpacity
          onPress={handleLogOut}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Wyloguj się</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('AddBillPage')}
        >
          <Text style={styles.btnText}>Dodaj nowy rachunek</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          borderColor: 'red',
          borderWidth: 2,
        }}
      >
        {loadingBills ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <FlatList
            style={{ width: '100%' }}
            data={billsList.filter((el) => el.category === filterValue)}
            renderItem={({ item, index }: { item: TBill; index: number }) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text>{item.name}</Text>
                <Text>{numberToString(item.value)} zł</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
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
  btn: {
    borderWidth: 2,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 5,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
  },
})
