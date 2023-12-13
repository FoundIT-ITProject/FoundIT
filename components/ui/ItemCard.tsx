import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';


const ItemCard = () => {
 return (
    <TouchableOpacity style={styles.cardContainer}>
        <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>title</Text>
        <Image source={{}} style={styles.cardImage}/>
        <Text style={styles.cardDescription}>description</Text>
        </View>
    </TouchableOpacity>
 );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius : 10,
        borderWidth : 1,
        borderColor : '#000000',
        backgroundColor: '#FFF',
    },
    cardContent: {

    },
    cardTitle: {
        fontFamily : 'Verdana',
        fontWeight : 'bold',
        color : '#BDBDBD',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 11,

    },
    cardImage: {
        backgroundColor: '#F2F2F2',
        width: 147,
        height: 147,
        borderRadius: 16,
        borderColor: '#333333',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    cardDescription: {
        fontSize: 12,
        fontFamily: 'Verdana',
        color: '#BDBDBD',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
    }


})


export default ItemCard