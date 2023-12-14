import React, { useState, useEffect } from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../../../lib/firebaseConfig";

const AdminPage = () => {
  const [userEmails, setUserEmails] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserEmails = async () => {
      try {
        const usersCollection = collection(FIREBASE_DB, "Users");
        const usersQuery = query(usersCollection, where("role", "==", "Admin"));
        const querySnapshot = await getDocs(usersQuery);

        const emails = querySnapshot.docs.map((doc) => doc.data().email);
        setUserEmails(emails);
      } catch (error) {
    //   console.error("Error fetching user emails:", error.message);
      }
    };

    fetchUserEmails();
  }, []);

  return (
    <View style={styles.cardContainer}>
<Text>users</Text>
      <FlatList
        data={userEmails}
        keyExtractor={(email) => email}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default AdminPage;
