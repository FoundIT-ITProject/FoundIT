import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  const handleButtonClick = () => {
    navigation.navigate("Regular" as never);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to Regular Page" onPress={handleButtonClick} />
    </View>
  );
};

export default Home;
