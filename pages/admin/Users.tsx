import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  const handleRegularButtonClick = () => {
    navigation.navigate("Regular");
  };

  const handleOwnerButtonClick = () => {
    navigation.navigate("Owner");
  };

  const handleAdminButtonClick = () => {
    navigation.navigate("Admin");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to Regular Page" onPress={handleRegularButtonClick} />
      <Button title="Go to Owner Page" onPress={handleOwnerButtonClick} />
      <Button title="Go to Admin Page" onPress={handleAdminButtonClick} />
    </View>
  );
};

export default Home;
