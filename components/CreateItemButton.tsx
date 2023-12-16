import { TouchableOpacity, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface CreateItemButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  styles?: any;
}

const CreateItemButton: React.FC<CreateItemButtonProps> = ({
  onPress,
  styles,
}) => {
  return (
    <TouchableOpacity style={styles} onPress={onPress}>
      <Ionicons name="add-circle" size={48} color="black" />
    </TouchableOpacity>
  );
};

export default CreateItemButton;
