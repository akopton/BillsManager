import { NavigationContainer, Route, TabRouter } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useRef, useState } from 'react'
import { ScrollView, Text, StyleSheet, Button } from 'react-native'
import { CategoryPage } from './pages/CategoryPage'
import { HomeScreen } from './pages/HomeScreen'
import { MonthPage } from './pages/MonthPage'
import { BillPage } from './pages/BillPage'
import { handleFirstCapitalLetter } from './methods/handleFirstCapitalLetter'
import { AddBillForm } from './components/AddBillForm'
import { AddBillPage } from './pages/AddBillPage'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LoginPage } from './pages/LoginPage'
const Stack = createNativeStackNavigator()

export default function App() {
  // APP ID bills_manager_realm-depzi
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
              return { title: 'Home' }
            }}
          />
          <Stack.Screen
            name="MonthPage"
            component={MonthPage}
            options={({ route, navigation }: any) => {
              const { props } = route.params
              return { title: handleFirstCapitalLetter(props.name) }
            }}
          />
          <Stack.Screen
            name="CategoryPage"
            component={CategoryPage}
            options={({ route, navigation }: any) => {
              const { props } = route.params
              return { title: handleFirstCapitalLetter(props.name) }
            }}
          />
          <Stack.Screen
            name="BillPage"
            component={BillPage}
            options={({ route, navigation }: any) => {
              const { props } = route.params
              return { title: handleFirstCapitalLetter(props.name) }
            }}
          />
          <Stack.Screen
            name="AddBillPage"
            component={AddBillPage}
            options={({ route, navigation }: any) => {
              return { title: 'Dodaj nowy rachunek' }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
