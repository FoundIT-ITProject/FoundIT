import React, { useState, useEffect, useCallback } from "react";
import { Text, FlatList, View, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../../../lib/firebaseConfig";
import RegularDetailsPage from './detail/RegularDetailsPage';

const RegularPage = ({ navigation }:{route:any, navigation:any}) => {
  const [userDetails, setUserDetails] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUserDetails = useCallback(async () => {
    try {
      const usersCollection = collection(FIREBASE_DB, "Users");
      const usersQuery = query(usersCollection, where("role", "==", "User"));
      const querySnapshot = await getDocs(usersQuery);

      const users = querySnapshot.docs.map((doc) => ({
        email: doc.data().email,
        voornaam: doc.data().Voornaam,
        achternaam: doc.data().Achternaam,
        uid: doc.data().UID,
      }));

      setUserDetails(users);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const handleEmailPress = (user) => {
    navigation.navigate("RegularDetailsPage", {
      email: user.email,
      voornaam: user.voornaam,
      achternaam: user.achternaam,
      uid: user.uid,
      refreshUserList: fetchUserDetails, // Pass the refreshUserList callback
    });
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchUserDetails();
    setIsRefreshing(false);
  }, [fetchUserDetails]);

  return (
    <View style={styles.cardContainer}>
      <FlatList
        data={userDetails}
        keyExtractor={(user) => user.email}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleEmailPress(item)}>
            <View style={styles.card}>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
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

export default RegularPage;
