import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { DropdownItem } from './DropdownItem'

export const CustomDropdown = (props: any) => {
  const [isOpened, setIsOpened] = useState<boolean>(props.opened)

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity
        style={styles.dropdownTitle}
        onPress={() => setIsOpened(!isOpened)}
      >
        <Text style={styles.dropdownTitleText}>{props.title}</Text>
      </TouchableOpacity>
      {isOpened && (
        <View style={styles.dropdownList}>
          {props.data.map((el: any, index: number) => (
            <DropdownItem
              {...el}
              key={index}
            />
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {},
  dropdownTitle: {},
  dropdownTitleText: {},
  dropdownList: {},
  dropdownListItem: {},
})
