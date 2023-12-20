import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  const handleRegularButtonClick = () => {
    navigation.navigate("Regular" as never);
  };

  const handleOwnerButtonClick = () => {
    navigation.navigate("Owner" as never);
  };

  const handleAdminButtonClick = () => {
    navigation.navigate("Admin" as never);
  };

  return (
  <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRegularButtonClick}>
        <Text style={styles.buttonText}>Regular</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOwnerButtonClick}>
        <Text style={styles.buttonText}>Owner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAdminButtonClick}>
        <Text style={styles.buttonText}>Admin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
