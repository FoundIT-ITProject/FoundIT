import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../lib/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

import SearchBar from "../components/ui/SearchBar";
import ItemCard from "../components/ui/ItemCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CreateItemButton from "../components/CreateItemButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ItemData } from "../lib/types";
import FilterButton from "../components/ui/FilterButton";
import FilterSwitches from "../components/FilterSwitches";
type RootStackParamList = {
  Home: undefined;
  UploadItem: undefined;
  // Add other screens here
};

const Home = () => {
  const [items, setItems] = useState<ItemData[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // This is because height of phones vary
  const windowHeight = Dimensions.get("window").height;

  // This state would determine if the drawer sheet is visible or not
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Function to open the bottom sheet
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  // Function to close the bottom sheet
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

  const navigation = useNavigation<NavigationProp>();

  const fetchItems = async () => {
    try {
      const itemsCollection = collection(FIREBASE_DB, "Items");
      const querySnapshot = await getDocs(itemsCollection);

      const fetchedItems: any[] = querySnapshot.docs.map((doc) => doc.data());

      setItems(fetchedItems);
      setFilteredItems(fetchedItems); // Initial state is set to all items
    } catch (error: any) {
      console.error("Unexpected error:", error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [refreshing]);

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [])
  );

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
          <FilterButton
            onPress={handleOpenBottomSheet}
            styles={styles.createItemButton}
          />
          <SearchBar onSearch={handleSearch} />
          <CreateItemButton
            styles={styles.createItemButton}
            onPress={() => navigation.navigate("UploadItem")}
          />
        </View>

        <View style={styles.itemContainer}>
          {filteredItems.map((item, index) => (
            <ItemCard key={index} item={item} navigation={navigation} />
          ))}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isBottomSheetOpen}
          onRequestClose={handleCloseBottomSheet}
        >
          <View style={[styles.bottomSheet, { height: windowHeight * 0.4 }]}>
            <View style={styles.modalCloseButton}>
              <Text style={styles.modalTitle}>Select Filter</Text>
              <TouchableOpacity onPress={handleCloseBottomSheet}>
                <Ionicons
                  name="md-close-circle-sharp"
                  size={38}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <FilterSwitches
              selectedStatus={selectedStatus}
              handleStatusFilter={handleStatusFilter}
            />
          </View>
        </Modal>
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
    justifyContent: "space-evenly",
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
    backgroundColor: "#3498db", // Change the color to your preference
  },
  // Modal styles
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    borderWidth: 1,
    borderColor: "red",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalCloseButton: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default Home;
