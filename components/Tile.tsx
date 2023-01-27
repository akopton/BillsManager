import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { Bill } from '../components/Bill'
import { handleFirstCapitalLetter } from '../methods/handleFirstCapitalLetter'
import { CategoryPage } from '../pages/CategoryPage'
import { TBill } from '../types/Bill'

export const Tile = ({ navigation, props }: any) => {
  useEffect(() => {}, [])

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(`${props.type}Page`, { props })}
      style={styles.tile}
    >
      <View>
        <Text style={styles.content}>
          {handleFirstCapitalLetter(props.name)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tile: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 20,
  },
  content: {
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 35,
  },
})
