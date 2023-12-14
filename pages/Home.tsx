import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import SearchBar from "../components/ui/SearchBar";
import ItemCard from "../components/ui/ItemCard";
 
const Home = () => {
  const [items, setItems] = useState<any[]>([]);
 
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase.from("Items").select("item_name, item_image");
 
        if (error) {
          console.error("Error fetching items:", error.message);
        } else {
          setItems(data || []);
        }
      } catch (error: any) {
        console.error("Unexpected error:", error.message);
      }
    };
 
    fetchItems();
  }, []);
 
  return (
<ScrollView contentContainerStyle={styles.container}>
<SearchBar />
<View style={styles.itemContainer}>
      {items.map((item, index) => (
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