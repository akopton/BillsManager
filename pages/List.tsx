import { View, Text, Button } from "react-native"

export const List = ({navigation}: any) => {

    return (
        <View>
            <Text>Drugi ekran</Text>
            <Button title="Drugi ekran" onPress={()=>navigation.navigate('SecondScreen')}></Button>
        </View>
    )
}