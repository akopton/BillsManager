import { ScrollView, View, Text } from "react-native"
import { Product } from "../components/Product"
import { globalStyles } from "../styles/global"
import { TProduct } from "../types/Product"

export const BillPage = ({route}:any) => {

    const {props} = route.params

    return (
        <ScrollView style={globalStyles.page}>
            <View style={globalStyles.listColumn}>
                {
                    props.products.map((product:TProduct, id:number) => (
                        <Product props={product} key={id}/>
                    ))
                }
            </View>
        </ScrollView>
    )
}