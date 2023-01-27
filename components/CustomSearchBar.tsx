import { ScrollView, TouchableOpacity, Text } from 'react-native'
import { SearchBarProps } from 'react-native-screens'
import { TCategory } from '../types/Category'

export const CustomSearchBar = (props: any) => {
  return (
    <ScrollView
      horizontal={true}
      style={{
        padding: 0,
        flexDirection: 'row',
      }}
      showsHorizontalScrollIndicator={false}
      snapToEnd={true}
    >
      {props.arr.map((el: TCategory, id: number) => {
        return (
          <TouchableOpacity
            key={id}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
              borderColor: el.name === props.filterValue ? 'white' : '#aaa',
              backgroundColor: el.name === props.filterValue ? '#aaa' : 'white',
              marginRight: id + 1 === props.arr.length ? 0 : 10,
            }}
            onPress={() => props.handleFilterValue(el.name)}
          >
            <Text
              style={{
                color: el.name === props.filterValue ? 'white' : 'black',
              }}
            >
              {el.name}
            </Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}
