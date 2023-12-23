import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ItemData } from "../lib/types";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, updateDoc, DocumentReference } from "firebase/firestore";
import { FIREBASE_DB } from "../lib/firebaseConfig";
import { usePushNotifications } from "./Notifications";
import { scheduleNotificationAsync } from "expo-notifications";
import { getAuth } from "firebase/auth";

const ItemDetail = ({ route }: { route: any }) => {
  const { item, imageUrl }: { item: ItemData; imageUrl: string } = route.params;
  const navigation = useNavigation();
  const { expoPushToken } = usePushNotifications();

  const [itemCreator, setItemCreator] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [redeemLoading, setRedeemLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchItemCreator = async (uid: string) => {
      try {
        const currentUser = getAuth();
        const userRef = doc(FIREBASE_DB, "Users", uid);
        const currentUserId = currentUser.currentUser?.uid as string;
        const currentUserRef = doc(FIREBASE_DB, "Users", currentUserId);

        const [userSnapshot, currentUserSnapshot] = await Promise.all([
          getDoc(userRef),
          getDoc(currentUserRef),
        ]);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const creator = userData?.Voornaam + " " + userData?.Achternaam;
          setItemCreator(creator || "No creator found");
        } else {
          console.log("User not found");
        }

        if (currentUserSnapshot.exists()) {
          const userData = currentUserSnapshot.data();
          const role = userData?.role;
          setUserRole(role || "No role found");
        } else {
          console.log("Current user not found");
        }
      } catch (error) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemCreator(item.user_id);
  }, [item.user_id]);

  const redeemItem = async (item: ItemData) => {
    setRedeemLoading(true);

    const itemRef: DocumentReference = doc(FIREBASE_DB, "Items", item.item_id);
    const newStatus =
      userRole === "User"
        ? item.status === "pending"
          ? "lost"
          : "pending"
        : item.status === "pending"
        ? "found"
        : "pending";

    try {
      await updateItemStatus(itemRef, newStatus);
    } catch (error) {
      handleItemUpdateError(error);
    }
  };

  const updateItemStatus = async (
    itemRef: DocumentReference,
    newStatus: string
  ) => {
    try {
      await updateDoc(itemRef, { status: newStatus });
      await schedulePushNotification();
    } catch (error) {
      handleItemUpdateError(error);
    } finally {
      setRedeemLoading(false);
      navigation.goBack();
    }
  };

  const schedulePushNotification = async () => {
    await scheduleNotificationAsync({
      content: {
        title: "Congratulations!",
        body: "The product has been moved.",
        data: { data: "goes here" },
      },
      trigger: { seconds: 1 },
    });
  };

  const handleFetchError = (error: any) => {
    console.error("Error fetching data:", error);
    Alert.alert("Error", "Something went wrong, please try again.");
  };

  const handleItemUpdateError = (error: any) => {
    console.error("Error updating item:", error);
    Alert.alert("Error", "Something went wrong, please try again.");
  };

  const renderButtonText = () => {
    if (redeemLoading) {
      return "Loading...";
    }

    if (userRole === "User") {
      return item.status === "pending" ? "Mark Item as Lost" : "Claim Item";
    } else if (userRole === "Owner") {
      if (item.status === "lost") {
        return "You can't claim a lost item";
      }
      return item.status === "pending"
        ? "Confirm Item as Found"
        : "Mark Item as Pending";
    }

    return "";
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
              setRedeemLoading(true);
              await redeemItem(item);
            }}
            disabled={redeemLoading}
          >
            <Text style={{ color: "#fff" }}>{renderButtonText()}</Text>
          </TouchableOpacity>
        </View>
      )}
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
