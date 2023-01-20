import { useEffect, useMemo, useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import { removePolishLetters } from "../methods/removePolishLetters";

export const AddBillForm = () => {
    const [query, setQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<any>();
    const [selectedProduct, setSelectedProduct] = useState<any>();
    const [categories, setCategories] = useState<any>([
        {
            name: 'spożywcze'
        },
        {
            name: 'samochód'
        },
        {
            name: 'opłaty'
        }
    ])

    const [products, setProducts] = useState<any>([
        {
            name: 'mleko',
        },
        {
            name: 'olej',
        },
        {
            name: 'jogurt',
        }
    ])


    const onSearch = (text:string) => {
        setQuery(text);
      };

    const filteredCategories:any = useMemo(() => {
        return categories.filter((el:{name:string}) => removePolishLetters(el.name).includes(removePolishLetters(query)))
    }, [query]);

    const filteredProducts:any = useMemo(() => {
        return products.filter((el:{name:string}) => removePolishLetters(el.name).includes(removePolishLetters(query)))
    }, [query]);
    

    return (
        <SafeAreaView style={globalStyles.page}>
            <View>
                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => {
                        onOpen('Category');
                    }}
                >
                    <Text style={styles.selectedItem}>{selectedCategory ? `${selectedCategory?.name}` : 'Wybierz kategorię'}</Text>
                </TouchableOpacity>
                <Picker
                    id="Category"
                    data={filteredCategories}
                    inputValue={query}
                    searchable={true}
                    label="Wybierz kategorię"
                    setSelected={setSelectedCategory}
                    onSearch={onSearch}
                    noDataFoundText={'Nie znaleziono'}
                    placeholderText={'Szukaj'}
                    closeText={'Zamknij'}
                />
            </View>
            <View>
                <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => {
                        onOpen('Product');
                    }}
                >
                    <Text style={styles.selectedItem}>{selectedProduct ? `${selectedProduct?.name}` : 'Wybierz produkt'}</Text>
                </TouchableOpacity>
                <Picker
                    id="Product"
                    data={filteredProducts}
                    inputValue={query}
                    searchable={true}
                    label="Wybierz produkt"
                    setSelected={setSelectedProduct}
                    onSearch={onSearch}
                    noDataFoundText={'Nie znaleziono'}
                    placeholderText={'Szukaj'}
                    closeText={'Zamknij'}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        minWidth: 250,
        maxWidth: 250,
        borderWidth: 2,
        borderColor: '#aaa',
        alignSelf: 'center'
    },
    selectedItem: {
        fontSize: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 2,
        borderColor: '#000000'
    }
})