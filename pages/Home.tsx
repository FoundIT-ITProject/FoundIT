import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { FIREBASE_AUTH } from "../lib/firebaseConfig";

const Home = () => {
  const currentUser = FIREBASE_AUTH.currentUser;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Wlcome {currentUser?.displayName}</Text>
      <TouchableOpacity
        style={styles.SignoutButton}
        onPress={() => {
          FIREBASE_AUTH.signOut();
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  SignoutButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default Home;
