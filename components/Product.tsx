import { View, Text, StyleSheet } from "react-native"

export const Product = ({props}: any) => {
    return (
        <View style={styles.container}>
            <Text>
                {props.name} ({props.count})
            </Text>
            <Text>
                {props.value}zł
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        borderBottomWidth: 2,
    },
    text: {
        fontSize: 30,
    }
})