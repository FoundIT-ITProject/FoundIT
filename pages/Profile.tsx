import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import {
    Alert,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Modal,
} from "react-native";
import { AuthCredential, User } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from "../lib/firebaseConfig";
import { Image } from "react-native";
import ProfileAvatar from "../components/ProfileAvatar";
import { Feather } from "@expo/vector-icons";
import { EmailAuthProvider } from "firebase/auth";


interface ExtendedUser extends User {
  updateEmail(email: string): Promise<void>;
  reauthenticateWithCredential(credential: AuthCredential): Promise<void>;
  updatePassword(password: string): Promise<void>;
}






const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<any>({});
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");


  const [nameClicked, setNameClicked] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const FIREBASE_DB = getFirestore(FIREBASE_APP);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        if (!currentUser) {
          throw new Error("User not authenticated");
        }
        setUser(currentUser);


        const profileRef = doc(FIREBASE_DB, 'Users', currentUser.uid);
        const profileSnapshot = await getDoc(profileRef);


        if (profileSnapshot.exists()) {
          const profileData = profileSnapshot.data();
          setUserDetails({
            id: profileSnapshot.id,
            Achternaam: profileData.Achternaam,
            Voornaam: profileData.Voornaam,
            email: profileData.email,
            password: profileData.email,


          });


          setEditedFirstName(profileData.Voornaam || "");
          setEditedEmail(profileData.email || "");
          setEditedLastName(profileData.Achternaam || "");
          console.log("User details:", JSON.stringify(userDetails));
        } else {
          throw new Error("Profile not found");
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
        Alert.alert("Error fetching user data");
      }
    };


    fetchData();
  }, []);


  const updateFirstName = async () => {
    try {
      if (editedFirstName !== userDetails.Voornaam) {
        const profileRef = doc(FIREBASE_DB, 'Users', userDetails.id);
      await updateDoc(profileRef, { Voornaam: editedFirstName });


        setUserDetails((prevDetails: any) => ({ ...prevDetails, Voornaam: editedFirstName }));
        Alert.alert("Name updated successfully!");
      }
    } catch (error: any) {
      console.error("Error updating name:", error.message);
      Alert.alert("Error updating name");
    }
  };
  const updateLastName = async () => {
    try {
      if (editedLastName !== userDetails.Achternaam) {
        const profileRef = doc(FIREBASE_DB, 'Users', userDetails.id);
        await updateDoc(profileRef, { Achternaam: editedLastName });


        setUserDetails((prevDetails: any) => ({ ...prevDetails,Achternaam: editedLastName }));
        Alert.alert("Name updated successfully!");
      }
    } catch (error: any) {
      console.error("Error updating name:", error.message);
      Alert.alert("Error updating name");
    }
  };
  const updateEmail = async () => {
    try {
      if (editedEmail !== userDetails.email) {
        await (user as ExtendedUser)?.updateEmail(editedEmail);


        setUserDetails((prevDetails: any) => ({ ...prevDetails, email: editedEmail }));
        Alert.alert("Email updated successfully!");
      }
    } catch (error: any) {
      console.error("Error updating email:", error.message);
      Alert.alert("Error updating email");
    }
  };


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


  const updatePassword = async () => {
    try {
      if (!currentPassword) {
        Alert.alert("Please enter your current password.");
        return;
      }

      const currentUser = user as ExtendedUser;

      if (currentUser) {
        const credential = EmailAuthProvider.credential(currentUser?.email || "", currentPassword);
        await currentUser.reauthenticateWithCredential(credential);
        await currentUser.updatePassword(editedPassword);

        setIsModalVisible(false);
        Alert.alert("Password updated successfully!");
        setEditedPassword("");
      } else {
        throw new Error("User not found");
      }
    } catch (error: any) {
      console.error("Error updating password:", error.message);
      Alert.alert("Error updating password. Please check your current password.");
    }
  };


  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      setUser(null);
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userDetails.Voornaam}'s Profile</Text>


      <ProfileAvatar />


      <View style={styles.form}>




        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setNameClicked(true)}
          >
            <TextInput
              value={editedFirstName}
              onChangeText={setEditedFirstName}
              style={[
                styles.input,
                {
                  borderBottomWidth: nameClicked ? 1 : 0,
                  borderColor: nameClicked ? "#ccc" : "transparent",
                },
              ]}
              placeholder={userDetails.Voornaam ? "" : "Enter your name"}
              placeholderTextColor="#888"
            />
            <Feather
              name="edit"
              size={24}
              color="black"
              onPress={updateFirstName}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>




<View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setNameClicked(true)}
          >
            <TextInput
              value={editedLastName}
              onChangeText={setEditedLastName}
              style={[
                styles.input,
                {
                  borderBottomWidth: nameClicked ? 1 : 0,
                  borderColor: nameClicked ? "#ccc" : "transparent",
                },
              ]}
              placeholder={userDetails.Achternaam ? "" : "Enter your name"}
              placeholderTextColor="#888"
            />
            <Feather
              name="edit"
              size={24}
              color="black"
              onPress={updateLastName}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>




        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setEmailClicked(true)}
          >
            <TextInput
              value={editedEmail}
              onChangeText={setEditedEmail}
              style={[
                styles.input,
                {
                  borderBottomWidth: emailClicked ? 1 : 0,
                  borderColor: emailClicked ? "#ccc" : "transparent",
                },
              ]}
              placeholder={userDetails.email ? "" : "Enter your email"}
              placeholderTextColor="#888"
            />
            <Feather
              name="edit"
              size={24}
              color="black"
              onPress={updateEmail}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>


        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={toggleModal}
        >
          <Text style={styles.changePasswordText}>Change Password</Text>
        </TouchableOpacity>


        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>


        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Password</Text>


              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter current password"
                  placeholderTextColor="#888"
                  secureTextEntry
                  style={styles.input}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
                <View style={styles.inputLine} />
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Enter new password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    style={styles.input}
                    value={editedPassword}
                    onChangeText={setEditedPassword}
                  />
                  <View style={styles.inputLine} />
                </View>
              </View>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={updatePassword}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={toggleModal}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};








const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    flex: 1,
    width: "100%",
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },


  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    display: 'flex',
    width: 269,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#000',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },


  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },


  confirmButton: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 100,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#000",
    padding: 20,
    borderRadius: 100,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    fontSize: 16,
    color: "#555",
    padding: 8,
  },
  inputLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },




avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#000',
  },


  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  icon: {
    marginLeft: 10,
  },


  changePasswordButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#888',
    padding: 10,
    borderRadius: 100,
    alignSelf: 'center',
    alignItems: 'center',
    width: 210,
    height: 50,
  },

  changePasswordText: {
    color: '#fff',
    fontSize: 18,
  },


});


export default Profile;
