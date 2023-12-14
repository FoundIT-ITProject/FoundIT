import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import React from "react";

const CreateItemButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Ionicons name="add-circle" size={42} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
});

export default CreateItemButton;
