import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { FIREBASE_AUTH } from "../lib/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import CreateItemButton from "../components/CreateItemButton";
type RootStackParamList = {
  Home: undefined;
  UploadItem: undefined;
  // Add other screens here
};

const Home = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

  const currentUser = FIREBASE_AUTH.currentUser;
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome {currentUser?.displayName}</Text>
      <CreateItemButton onPress={() => navigation.navigate("UploadItem")} />
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
