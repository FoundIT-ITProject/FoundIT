import React from "react";
import { View, Text, Button } from "react-native";
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Go to Regular Page" onPress={handleRegularButtonClick} />
      <Button title="Go to Owner Page" onPress={handleOwnerButtonClick} />
      <Button title="Go to Admin Page" onPress={handleAdminButtonClick} />
    </View>
  );
};

export default Home;
