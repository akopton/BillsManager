import React, { useEffect, useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { globalStyles } from '../styles/global'
import { signOut } from 'firebase/auth'
import { auth, billsRef } from '../firebase'
import { onSnapshot } from 'firebase/firestore'
import { TBill } from '../types/Bill'
import { numberToString } from '../methods/numberToString'

// wyświetla wszystkie miesiące z danego roku

export const HomeScreen = ({ route, navigation }: any) => {
  const [loadingBills, setLoadingBills] = useState<boolean>(false)
  const [billsList, setBillsList] = useState<TBill[]>([])

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

  return (
    <View style={[globalStyles.page]}>
      <TouchableOpacity
        style={styles.addBillBtn}
        onPress={() => navigation.navigate('AddBillPage')}
      >
        <Text style={styles.btnText}>Dodaj nowy rachunek</Text>
      </TouchableOpacity>
      <View
        style={{
          height: '75%',
          width: '100%',
          borderColor: 'red',
          borderWidth: 2,
        }}
      >
        {loadingBills ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <ScrollView style={{ width: '100%' }}>
            {billsList?.map((bill, id) => {
              return (
                <TouchableOpacity
                  key={id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text>{bill.name}</Text>
                  <Text>{numberToString(bill.value)} zł</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        )}
      </View>
      <TouchableOpacity
        onPress={handleLogOut}
        style={{ position: 'absolute', bottom: 50, left: 50 }}
      >
        <Text>Wyloguj się</Text>
      </TouchableOpacity>
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
  addBillBtn: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#000000',
    borderRadius: 20,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 20,
    textAlign: 'center',
  },
})
