import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const CreateItem = () => {
  const handleSubmit = () => {
    // Handle the submit action here
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Create Item</Text>
        <TextInput
          style={styles.itemInput}
          placeholder="Item Name"
          placeholderTextColor={"#808080"}
        />
        <TextInput
          style={styles.itemInput}
          placeholder="Item Description"
          placeholderTextColor={"#808080"}
        />
        <TextInput
          style={styles.itemInput}
          placeholder="Item Price"
          placeholderTextColor={"#808080"}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5", // Light grey background
  },

  itemContainer: {
    alignItems: "baseline",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 10, // Rounded corners
    shadowColor: "#000", // Shadow for a "card" effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  itemInput: {
    height: 40,
    width: 200,
    padding: 10,
    margin: 12,
    borderWidth: 1,
    borderColor: "#ddd", // Light grey border
    borderRadius: 5, // Rounded corners
    color: "black",
    backgroundColor: "#fff", // White background
  },
  submitButton: {
    backgroundColor: "#6c63ff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CreateItem;
