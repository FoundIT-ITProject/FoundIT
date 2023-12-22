import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ItemData } from "../lib/types";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../lib/firebaseConfig";
import { usePushNotifications } from "./Notifications";
import { scheduleNotificationAsync } from "expo-notifications";

const ItemDetail = ({ route }: { route: any }) => {
  const { item, imageUrl }: { item: ItemData; imageUrl: string } = route.params;
  const navigation = useNavigation();
  const {expoPushToken} = usePushNotifications();
  console.log(expoPushToken);

  const [itemCreator, setItemCreator] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // State for general loading
  const [redeemLoading, setRedeemLoading] = useState<boolean>(false); // State for redeem button loading

  useEffect(() => {
    const getItemCreator = async (uid: string) => {
      const userRef = doc(FIREBASE_DB, "Users", uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const creator = userData?.Voornaam + " " + userData?.Achternaam;
          setItemCreator(creator || "No creator found");
        } else {
          console.log("User not found");
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      } finally {
        setLoading(false); // Set general loading to false once data is fetched
      }
    };

    getItemCreator(item.user_id);
  }, [item.user_id]);

  const redeemItem = async (item: ItemData) => {
    setRedeemLoading(true); // Set redeem button loading state to true

    const itemRef = doc(FIREBASE_DB, "Items", item.item_id);
    if (item.status === "pending") {
      try {
        await updateDoc(itemRef, {
          status: "lost",
        });
      } catch (error) {
        console.error("Error updating item:", error);
      } finally {
        setRedeemLoading(false); // Set redeem button loading state to false
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
      setRedeemLoading(false); // Set redeem button loading state to false
    }

    
  };

  

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>{item.item_name}</Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.cardImage} />
          </View>
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
          <View style={styles.detailsContainer}>
            <Text style={styles.detailLabel}>Creator:</Text>
            <Text style={styles.detailText}>{itemCreator}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              setRedeemLoading(true); // Set redeem button loading state to true before redeemItem call
              await redeemItem(item);
              navigation.goBack();
              await schedulePushNotification();

            }}
            disabled={redeemLoading} // Disable button when it's in loading state
          >
            <Text style={{ color: "#fff" }}>
              {redeemLoading
                ? "Loading..."
                : item.status === "pending"
                ? "Mark as lost"
                : "Redeem Item"}
            </Text>
          </TouchableOpacity>
        </View>

      )}
    </View>
  );
};

async function schedulePushNotification() {
  await scheduleNotificationAsync({
    content: {
      title: "Proficiat !",
      body: 'De product is verplaatst ',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  cardImage: {
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
