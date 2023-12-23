import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ItemData } from "../lib/types";
import ItemCard from "../components/ui/ItemCard";
import { Image } from "react-native";

const ItemPage = ({ onClose }: { onClose: () => void }) => {
  const [userItems, setUserItems] = useState<ItemData[]>([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [deleteItemId, setDeleteItemId] = useState<string | null>(null); // Track te deleten item

  const [editedItem, setEditedItem] = useState<ItemData | null>(null);

  useEffect(() => {
    const fetchUserItems = async () => {
      if (currentUser) {
        const firestore = getFirestore();
        const itemsRef = collection(firestore, "Items");
        const userItemsQuery = query(
          itemsRef,
          where("user_id", "==", currentUser.uid)
        );

        try {
          const querySnapshot = await getDocs(userItemsQuery);
          const itemsData: ItemData[] = [];

          querySnapshot.forEach((doc) => {
            itemsData.push({ ...doc.data(), item_id: doc.id } as ItemData);
          });

          setUserItems(itemsData);
        } catch (error) {
          console.error("Error fetching user items:", error);
        }
      }
    };

    fetchUserItems();
  }, [currentUser]);

  const handleDeleteItem = (itemId: string) => {
    setDeleteItemId(itemId); // Set the ID of the item to be deleted
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null); // Reset the deleteItemId state to cancel the deletion
  };

  const handleConfirmDelete = async () => {
    if (deleteItemId) {
      const firestore = getFirestore();
      const itemDocRef = doc(firestore, "Items", deleteItemId);

      try {
        await deleteDoc(itemDocRef);
        setUserItems((prevItems) =>
          prevItems.filter((item) => item.item_id !== deleteItemId)
        );
        console.log("Item deleted successfully!");
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally {
        setDeleteItemId(null);
      }
    }
  };

  const handleEditItem = (itemId: string) => {
    const foundItem = userItems.find((item) => item.item_id === itemId);
    setEditedItem(foundItem || null);
  };

  const handleCancelEdit = () => {
    setEditedItem(null);
  };

  const handleConfirmEdit = async () => {
    if (editedItem) {
      const firestore = getFirestore();
      const itemDocRef = doc(firestore, "Items", editedItem.item_id);

      try {
        await updateDoc(itemDocRef, editedItem);
        setUserItems((prevItems) =>
          prevItems.map((item) =>
            item.item_id === editedItem.item_id ? editedItem : item
          )
        );
        console.log("Item edited successfully!");
      } catch (error) {
        console.error("Error editing item:", error);
      } finally {
        setEditedItem(null);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={onClose}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {userItems.map((item) => (
          <View key={item.item_id} style={styles.itemCardContainer}>
            <ItemCard item={item} navigation={null} />
            <TouchableOpacity
              style={styles.deleteButtonContainer}
              onPress={() => handleDeleteItem(item.item_id)}
            >
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editButtonContainer}
              onPress={() => handleEditItem(item.item_id)}
            >
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Modal */}
      {editedItem && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}
          onRequestClose={handleCancelEdit}
        >
          <KeyboardAvoidingView style={styles.container}>
            <View style={styles.itemContainer}>
              <Text style={styles.title}>Edit Item</Text>

              <TextInput
                style={styles.input}
                value={editedItem.item_name}
                onChangeText={(text) =>
                  setEditedItem({ ...editedItem, item_name: text })
                }
                placeholder="Item Name"
              />
              <TextInput
                style={styles.input}
                value={editedItem.item_description}
                onChangeText={(text) =>
                  setEditedItem({ ...editedItem, item_description: text })
                }
                placeholder="Item Description"
              />
              <TextInput
                style={styles.input}
                value={editedItem.location_lost}
                onChangeText={(text) =>
                  setEditedItem({ ...editedItem, location_lost: text })
                }
                placeholder="Location Lost"
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleConfirmEdit}
              >
                <Text style={styles.submitButtonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelEdit}
              >
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}

      {/* Confirmation Modal */}
      {deleteItemId && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => setDeleteItemId(null)}
        >
          <View style={styles.confirmationModal}>
            <View style={styles.confirmationContent}>
              <Text style={styles.confirmationText}>
                Are you sure you want to delete this item?
              </Text>
              <View style={styles.confirmationButtonGroup}>
                <TouchableOpacity
                  onPress={handleConfirmDelete}
                  style={styles.confirmButton}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancelDelete}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 50,
  },
  itemCardContainer: {
    width: "48%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    padding: 5,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  deleteButtonContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 30,
    height: 30,
  },
  editButtonContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    width: 30,
    height: 30,
  },

  closeButtonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#000",
    borderRadius: 100,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    alignSelf: "center",
    width: 110,
    height: 50,
  },
  closeButtonText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 18,
  },
  confirmationModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmationContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  confirmationText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  confirmationButtonGroup: {
    flexDirection: "row",
    justifyContent: "center",
  },
  confirmButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#888",
    padding: 10,
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    width: 112,
    height: 50,
  },
  cancelButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    width: 210,
    height: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  itemContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#888",
    padding: 10,
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    width: 210,
    height: 50,
  },

  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  editButton: {
    color: "blue",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  input: {
    fontSize: 16,
    color: "#555",
    padding: 8,
    textAlign: "center",
  },
});

export default ItemPage;
