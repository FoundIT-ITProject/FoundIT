import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ItemData } from '../lib/types';
import ItemCard from '../components/ui/ItemCard';

const ItemPage = ({ onClose }: { onClose: () => void }) => {
  const [userItems, setUserItems] = useState<ItemData[]>([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserItems = async () => {
      if (currentUser) {
        const firestore = getFirestore();
        const itemsRef = collection(firestore, 'Items');
        const userItemsQuery = query(itemsRef, where('user_id', '==', currentUser.uid));

        try {
          const querySnapshot = await getDocs(userItemsQuery);
          const itemsData: ItemData[] = [];

          querySnapshot.forEach((doc) => {
            itemsData.push({ ...doc.data(), item_id: doc.id } as ItemData);
          });

          setUserItems(itemsData);
        } catch (error) {
          console.error('Error fetching user items:', error);
        }
      }
    };

    fetchUserItems();
  }, [currentUser]);

  const handleDeleteItem = async (itemId: string) => {
    const firestore = getFirestore();
    const itemDocRef = doc(firestore, 'Items', itemId);

    try {
      await deleteDoc(itemDocRef);
      setUserItems((prevItems) => prevItems.filter((item) => item.item_id !== itemId));
      console.log('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
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
            <TouchableOpacity onPress={() => handleDeleteItem(item.item_id)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemCardContainer: {
    width: '48%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    padding: 5,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
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
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 18,
  },});

export default ItemPage;