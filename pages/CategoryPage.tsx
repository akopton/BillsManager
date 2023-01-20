import { View, Text, ScrollView, StyleSheet } from "react-native"
import { Bill } from "../components/Bill"
import { billsList } from "../constants/bills"
import { globalStyles } from "../styles/global"
import { TBill } from "../types/Bill"
import { TCategory } from "../types/Category"


// wyświetla wszystkie rachunki przypisane do danej kategorii


export const CategoryPage = ({route, navigation}:any) => {

    const {props} = route.params

    return (
        <ScrollView style={globalStyles.page}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{props.value().toFixed(2)}zł</Text>
            </View>
            <View style={globalStyles.listColumn}>
                {
                    props.bills.map((bill:TBill, id:number) => (
                        <Bill key={id} navigation={navigation} props={bill}/>
                    ))
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
    },
    titleText: {
        fontSize: 40
    }
})