import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../lib/firebaseConfig";
import SearchBar from "../components/ui/SearchBar";
import ItemCard from "../components/ui/ItemCard";
import { useNavigation } from "@react-navigation/native";
import CreateItemButton from "../components/CreateItemButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type RootStackParamList = {
  Home: undefined;
  UploadItem: undefined;
  // Add other screens here
};

const Home = () => {
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

  const navigation = useNavigation<NavigationProp>();

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

  useEffect(() => {
    fetchItems();
  }, [refreshing]);

  const handleSearch = (searchTerm: string) => {
    const filtered = items.filter((item) =>
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleStatusFilter = (status: string | null) => {
    setSelectedStatus(status);
    if (status === null) {
      //Here can you see all the items
      setFilteredItems(items);
    } else {
      // You can see the selected items
      const filtered = items.filter((item) => item.status === status);
      setFilteredItems(filtered);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchItems} />
      }
      contentContainerStyle={styles.container}
    >
      {refreshing ? <ActivityIndicator /> : null}
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedStatus === null && styles.selectedFilter,
            ]}
            onPress={() => handleStatusFilter(null)}
          >
            <Text>Alle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedStatus === "lost" && styles.selectedFilter,
            ]}
            onPress={() => handleStatusFilter("lost")}
          >
            <Text>Lost</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedStatus === "pending" && styles.selectedFilter,
            ]}
            onPress={() => handleStatusFilter("pending")}
          >
            <Text>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedStatus === "found" && styles.selectedFilter,
            ]}
            onPress={() => handleStatusFilter("found")}
          >
            <Text>Found</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <SearchBar onSearch={handleSearch} />
          <CreateItemButton
            styles={styles.createItemButton}
            onPress={() => navigation.navigate("UploadItem")}
          />
        </View>

        <View style={styles.itemContainer}>
          {filteredItems.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  createItemButton: {
    alignSelf: "center",
    marginBottom: 16,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 10,
  },
  selectedFilter: {
    backgroundColor: "#3498db", // Pas de kleur aan naar jouw voorkeur
  },
});

export default Home;
