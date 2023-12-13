import react from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 



export default function SearchBar(){
    return(

        <View style={styles.ResearchBar}>
        <View style={styles.Main}>
            <TextInput placeholder='What did you lost?' style={styles.Input}></TextInput>
            <TouchableOpacity>
            <AntDesign name="search1" size={28} color="black" />
            </TouchableOpacity> 
        </View>

        <View>
        

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    ResearchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        
    },
    Main:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        width: 269,
        height: 54,
        padding: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#000',
    },
    Input:{
        margin: 10,

    },
    ButtonSearch:{
        width: 44,
        height: 44,
    }
})
