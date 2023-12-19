import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../../lib/firebaseConfig'; // Adjust the import path accordingly
import { deleteUser, getAuth } from "firebase/auth";
const RegularDetailsPage = ({ route, navigation }: { route: any; navigation: any }) => {
  const { email, voornaam, achternaam, uid } = route.params;

  const handleDelete = async () => {


const auth = getAuth();
const user = auth.currentUser?.email
console.log(email);
/*
deleteUser(user).then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
});
  */

  };



  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>

        <Text style={styles.label}>First Name:</Text>
        <Text style={styles.value}>{voornaam}</Text>

        <Text style={styles.label}>Last Name:</Text>
        <Text style={styles.value}>{achternaam}</Text>

        <Text style={styles.label}>UID:</Text>
        <Text style={styles.value}>{uid}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RegularDetailsPage;
