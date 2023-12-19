import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

const ItemCard = ({ item, navigation }: { item: any; navigation: any }) => {
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/150");

  useEffect(() => {
    const storage = getStorage();
    const imageRef = ref(storage, `images/${item.image_url}`);

    const fetchImage = async () => {
      try {
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error getting image from Firebase Storage:", error);
      }
    };

    fetchImage();
  }, [item]);

  const navigateToDetail = () => {
    navigation.navigate("ItemDetail", { item }); // Pass the item as a parameter
  };

  return (
    <TouchableOpacity onPress={navigateToDetail} style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.item_name}</Text>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <Text style={styles.cardDescription}>
          location lost: {item.location_lost}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#FFF",
    marginBottom: 16,
  },
  cardContent: {},
  cardTitle: {
    fontFamily: "Verdana",
    fontWeight: "bold",
    color: "#BDBDBD",
    fontSize: 18,
    marginLeft: 10,
    marginTop: 11,
  },
  cardImage: {
    backgroundColor: "#F2F2F2",
    width: 147,
    height: 147,
    borderRadius: 16,
    borderColor: "#333333",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  cardDescription: {
    fontSize: 12,
    fontFamily: "Verdana",
    color: "#BDBDBD",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
});

export default ItemCard;
