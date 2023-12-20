import React from "react";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CreateItemButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  styles?: any;
}

const FilterButton: React.FC<CreateItemButtonProps> = ({ onPress, styles }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles}>
      <Ionicons name="filter" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default FilterButton;
