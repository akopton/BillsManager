import { Button, ScrollView, Text, View, StyleSheet } from "react-native"

export const SecondScreen = ({navigation}:any) => {

    return (
        <ScrollView style={styles.page} >
            <View style={styles.nav}>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        height: 100,
        flex: 1,
        backgroundColor: '#eaeaea',
      },
      nav: {
        paddingTop: 40,
        flex: 1,
    },
})