import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface CreateItemButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const CreateItemButton: React.FC<CreateItemButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="add-circle" size={48} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "relative",
    bottom: 10,
    right: 0,
  },
});

export default CreateItemButton;
