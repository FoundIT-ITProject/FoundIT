import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { useState } from "react";

const CreateItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemLocation, setItemLocation] = useState("");

  const handleSubmit = () => {
    console.log(itemName, itemDescription, itemLocation);
    setItemName("");
    setItemDescription("");
    setItemLocation("");
  };

  const [image, setImage] = useState<any>("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // This is the important bit!
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
      console.log(image);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let cameraResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // This is the important bit!
    });

    if (!cameraResult.canceled) {
      setImage(cameraResult.assets[0].uri);
      console.log(image);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.title}>Create Item</Text>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        <Button title="Take a photo" onPress={takePhoto} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <TextInput
          style={styles.itemInput}
          placeholder="Item Name"
          placeholderTextColor={"#808080"}
          value={itemName}
          onChangeText={(text) => setItemName(text)}
        />
        <TextInput
          style={styles.itemInput}
          placeholder="Item Description"
          placeholderTextColor={"#808080"}
          value={itemDescription}
          onChangeText={(text) => setItemDescription(text)}
        />
        <TextInput
          style={styles.itemInput}
          placeholder="Item Location"
          placeholderTextColor={"#808080"}
          value={itemLocation}
          onChangeText={(text) => setItemLocation(text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5", // Light grey background
    marginBottom: 100,
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
