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

    },
    cardContent: {

    },
    cardTitle: {

    },
    cardImage: {

    },
    cardDescription: {
        
    }


})


export default ItemCard