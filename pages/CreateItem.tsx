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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import * as ImagePicker from "expo-image-picker";

import { useState } from "react";

import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_STORAGE } from "../lib/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytes, uploadString } from "firebase/storage";

import { decode } from "base-64";

if (typeof atob === "undefined") {
  global.atob = decode;
}

const CreateItem = () => {
  const navigation = useNavigation();

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [image, setImage] = useState<any>("");

  const [date, setDate] = useState<Date | undefined>();

  const handleSubmit = async () => {
    if (!itemName || !itemDescription || !itemLocation || !date || !image) {
      console.log("Please fill in all fields");
      return;
    }

    // Upload the image to Firebase Storage
    await uploadImageAndSaveURL();

    try {
      const docRef = await addDoc(collection(FIREBASE_DB, "Items"), {
        created_at: new Date().toLocaleString(),
        date_lost: date?.toLocaleString(),
        item_name: itemName,
        item_description: itemDescription,
        location_lost: itemLocation,
        image_url: "https://via.placeholder.com/150",
        status: "lost",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    console.log(itemName, itemDescription, itemLocation);
    setItemName("");
    setItemDescription("");
    setItemLocation("");

    navigation.goBack();
  };

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // This is the important bit!
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0]);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    } catch (error) {
      console.error("Error requesting camera permissions: ", error);
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
    }
  };

  const uploadImageAndSaveURL = async () => {
    try {
      if (image) {
        // Create a reference to the Firebase Storage location where the image will be uploaded
        const imageRef = ref(FIREBASE_STORAGE, "images/");

        // Base64 formatted string
        uploadString(imageRef, image.base64, "base64").then((snapshot) => {
          console.log("Uploaded a base64 string!");
        });
        alert("Image uploaded successfully!");
      } else {
        alert("Please select an image first!");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Error uploading image. Please try again.");
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
          <Image
            source={{ uri: image.uri }}
            style={{ width: 200, height: 200 }}
          />
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
        <DateTimePicker
          value={date || new Date()}
          mode={"date"}
          is24Hour={true}
          onChange={(event, selectedDate) => {
            setDate(selectedDate);
          }}
        />
        <DateTimePicker
          value={date || new Date()}
          mode={"time"}
          is24Hour={true}
          onChange={(event, selectedDate) => {
            setDate(selectedDate);
          }}
        />
        <Text>{date?.toLocaleString()}</Text>

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
