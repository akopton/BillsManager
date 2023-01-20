import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { Bill } from '../components/Bill';
import { Tile } from '../components/Tile';
import { billsList } from '../constants/bills';
import { TBill } from '../types/Bill';
import { TCategory } from '../types/Category';
import { sample_data } from '../constants/data';
import { globalStyles } from '../styles/global';
import { AddBillForm } from '../components/AddBillForm';
import { useQuery, useRealm } from '../realm/models/Bill';


// wyświetla wszystkie miesiące z danego roku


export const HomeScreen = ({route, navigation}:any) => {
    


    const {year} = sample_data

    return (
        <ScrollView style={globalStyles.page}>
            <TouchableOpacity style={styles.addBillBtn} onPress={()=>navigation.navigate('AddBillPage')}>
                <Text style={styles.btnText}>Dodaj nowy rachunek</Text>
            </TouchableOpacity>
            <View style={globalStyles.listColumn}>
                {
                    year.months.map((month, id) => (
                        <Tile key={id} navigation={navigation} props={month}/>
                    ))
                }
            </View>
            <View>
                {

                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
      borderBottomColor: '#000000',
      marginTop: 16,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: '#20232a',
      borderRadius: 6,
      backgroundColor: '#61dafb',
      color: '#20232a',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
    addBillBtn: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 10,
        borderColor: '#000000',
        borderRadius: 20,
        marginBottom: 20,
    },
    btnText: {
        fontSize: 20,
        textAlign: 'center'
    }
  });