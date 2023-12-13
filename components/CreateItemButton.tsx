import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface CreateItemButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const CreateItemButton: React.FC<CreateItemButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Ionicons name="add-circle" size={42} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 40,
    marginBottom: 40,
  },
});

export default CreateItemButton;
