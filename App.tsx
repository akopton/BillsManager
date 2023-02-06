import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { CategoryPage } from './pages/CategoryPage'
import { HomeScreen } from './pages/HomeScreen'
import { MonthPage } from './pages/MonthPage'
import { handleFirstCapitalLetter } from './methods/handleFirstCapitalLetter'
import { AddBillPage } from './pages/AddBillPage'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LoginPage } from './pages/LoginPage'
import { HeaderNewBillBtn } from './components/HeaderNewBillBtn'
import { LogoutBtn } from './components/LogoutBtn'
import { BillPage } from './pages/BillPage'
import { HeaderDeleteBtn } from './components/HeaderDeleteBtn'
import { HeaderAddBillBtn } from './components/HeaderAddBillBtn'
import { TBill } from './types/Bill'
import { EditBillPage } from './pages/EditBillPage'
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginPage">
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            initialParams={(route: any) => {
              return route
            }}
            options={({ route, navigation }: any) => {
              return { title: 'Zaloguj się' }
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ route, navigation }: any) => {
              return {
                title: 'Home',
                headerLeft: () => <LogoutBtn navigation={navigation} />,
                headerRight: () => <HeaderNewBillBtn navigation={navigation} />,
              }
            }}
          />
          <Stack.Screen
            name="AddBillPage"
            component={AddBillPage}
            options={({ route, navigation }: any) => {
              return {
                title: 'Dodaj nowy rachunek',
              }
            }}
          />
          <Stack.Screen
            name="BillPage"
            component={BillPage}
            options={({ route, navigation }: any) => {
              const bill = route.params
              return {
                title: handleFirstCapitalLetter(bill.name),
                headerRight: () => (
                  <HeaderDeleteBtn
                    {...bill}
                    navigation={navigation}
                  />
                ),
              }
            }}
          />
          <Stack.Screen
            name="EditBillPage"
            component={EditBillPage}
            options={({ route, navigation }: any) => {
              const bill = route.params
              return {
                title: handleFirstCapitalLetter(bill.name),
                headerRight: () => (
                  <HeaderDeleteBtn
                    {...bill}
                    navigation={navigation}
                  />
                ),
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
