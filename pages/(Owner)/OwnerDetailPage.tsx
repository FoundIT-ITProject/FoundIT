import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ItemData } from "../../lib/types";
import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../lib/firebaseConfig";

const ItemDetail = ({ route }: { route: any }) => {
  const { item, imageUrl }: { item: ItemData; imageUrl: string } = route.params;
  const navigation = useNavigation();

  const redeamItem = async (item: ItemData) => {
    const itemRef = doc(FIREBASE_DB, "Items", item.item_id);
    if (item.status === "pending") {
      try {
        await updateDoc(itemRef, {
          status: "lost",
        });
      } catch (error) {
        console.error("Error updating item:", error);
      } finally {
        return;
      }
    }

    try {
      await updateDoc(itemRef, {
        status: "pending",
      });
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.item_name}</Text>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <Text style={styles.description}>{item.item_description}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Location Lost:</Text>
          <Text style={styles.detailText}>{item.location_lost}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Date Lost:</Text>
          <Text style={styles.detailText}>{item.date_lost}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Created At:</Text>
          <Text style={styles.detailText}>{item.created_at}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={styles.detailText}>{item.status}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            redeamItem(item);
            navigation.goBack();
          }}
        >
          <Text style={{ color: "#fff" }}>
            {item.status === "found" ? "Mark as redeem" : "Mark as founded"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    height: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardImage: {
    marginHorizontal: "auto",
    height: 300,
    marginBottom: 15,
    aspectRatio: 1,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  detailsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  detailText: {
    flex: 1,
  },
  button: {
    backgroundColor: "#6c63ff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});

export default ItemDetail;