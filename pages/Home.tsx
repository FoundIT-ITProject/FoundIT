import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../lib/firebaseConfig";

import SearchBar from "../components/ui/SearchBar";
import ItemCard from "../components/ui/ItemCard";

const Home = () => {
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsCollection = collection(FIREBASE_DB, "Items");
        const querySnapshot = await getDocs(itemsCollection);

        const fetchedItems = querySnapshot.docs.map((doc) => doc.data());

        setItems(fetchedItems);
        setFilteredItems(fetchedItems); // Initial state is set to all items
      } catch (error: any) {
        console.error("Unexpected error:", error.message);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <View style={styles.itemContainer}>
        {filteredItems.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default Home;
