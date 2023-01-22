import React, { useEffect, useState } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { globalStyles } from '../styles/global'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/auth/firebase'

// wyświetla wszystkie miesiące z danego roku

export const HomeScreen = ({ route, navigation }: any) => {
  const handleLogOut = () => {
    signOut(auth)
      .then(() => navigation.replace('LoginPage'))
      .catch(() => alert('Wystąpił błąd.'))
  }

  return (
    <ScrollView style={globalStyles.page}>
      <TouchableOpacity
        style={styles.addBillBtn}
        onPress={() => navigation.navigate('AddBillPage')}
      >
        <Text style={styles.btnText}>Dodaj nowy rachunek</Text>
      </TouchableOpacity>
      <View style={globalStyles.listColumn}></View>
      <TouchableOpacity onPress={handleLogOut}>
        <View>
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
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
