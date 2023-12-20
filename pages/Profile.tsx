import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  KeyboardAvoidingView,
  Alert,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  Modal,
} from "react-native";
import { AuthCredential, User } from "firebase/auth";
import {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIREBASE_DB,
} from "../lib/firebaseConfig";
import { Image } from "react-native";
import ProfileAvatar from "../components/ProfileAvatar";
import { Feather } from "@expo/vector-icons";
import {
  EmailAuthProvider,
  getAuth,
  updateProfile,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import ItemPage from '../components/ItemPage';

const Profile = () => {

  const navigation = useNavigation();

  const auth = getAuth(FIREBASE_APP);
  const currentUser: User | null = auth.currentUser;

  const userUid = currentUser?.uid || "";

  const [email, setEmail] = useState(currentUser?.email || "");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const [showFirstNameInput, setShowFirstNameInput] = useState(false);
  const [showLastNameInput, setShowLastNameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const [showMyItemsModal, setShowMyItemsModal] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        if (currentUser) {
          const userDocRef = doc(FIREBASE_DB, "Users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setFirstName(userData.Voornaam || "");
            setLastName(userData.Achternaam || "");
            setEmail(userData.email || "");
          }
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
      }
    }

    fetchUserData();
  }, [currentUser]);


  const handleFirstNameIconClick = async () => {
    setShowFirstNameInput((prev) => !prev);
    if (showFirstNameInput) {
      try {
        if (currentUser) {
          const userDocRef = doc(FIREBASE_DB, "Users", currentUser.uid);

          await setDoc(userDocRef, { Voornaam: firstName }, { merge: true });
          console.log("First Name Updated!");
        }
      } catch (error: any) {
        console.error("Error updating first name:", error.message);
      }
    }
  };

  const handleLastNameIconClick = async () => {
    setShowLastNameInput((prev) => !prev);
    if (showLastNameInput) {
      try {
        if (currentUser) {
          const userDocRef = doc(FIREBASE_DB, "Users", currentUser.uid);

          await setDoc(userDocRef, { Achternaam: lastName }, { merge: true });
          console.log("Last Name Updated!");
        }
      } catch (error: any) {
        console.error("Error updating last name:", error.message);
      }
    }
  };

  const handleEmailIconClick = async () => {
    setShowEmailInput((prev) => !prev);
    if (showEmailInput) {
      try {
        if (currentUser) {
          const userDocRef = doc(FIREBASE_DB, "Users", currentUser.uid);

          await setDoc(userDocRef, { email: email }, { merge: true });
          console.log("Email Updated!");
        }
      } catch (error: any) {
        console.error("Error updating email:", error.message);
      }
    }
  };
  const handleOpenEmailModal = () => {
    setShowEmailModal(true);
  };
  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setPassword("");
  };
  const handleChangeEmail = async () => {
    if (!currentUser) {
      return;
    }
    try {
      const user = auth.currentUser;
      console.log("Current Email:", currentUser.email);

      // Reauthenticate the user without asking for the password input again
      const credential = EmailAuthProvider.credential(
        currentUser.email || "",
        password
      );
      await reauthenticateWithCredential(currentUser, credential);
      console.log("Reauthenticated!");

      // Update the email
      await updateEmail(currentUser, email);
      console.log("Email Updated!");
      setEmail(email);

      setShowEmailModal(false); // Close the modal after successful email update
    } catch (error: any) {
      setError(error);
      console.error("Error updating email:", error);
    } finally {
      setLoading(false);
      setPassword(""); // Clear the password after usage for security
    }
  };
  const handleCancelPasswordChange = () => {
    setShowPasswordModal(false);
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
  };

  const handleChangePassword = async () => {
    if (!currentUser) {
      // Handle the case where currentUser is null
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(new Error("Passwords do not match"));
      return;
    }

    setLoading(true);
    try {
      const credentials = await reauthenticateWithCredential(
        currentUser!,
        EmailAuthProvider.credential(currentUser.email!, password)
      );
      await updatePassword(credentials.user, newPassword);
      setShowPasswordModal(false);
      console.log("Password Changed Successfully!");
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      // go to login
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleMyItemsClick = () => {
    setShowMyItemsModal(true);
  };

  const handleCloseMyItemsModal = () => {
    setShowMyItemsModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View>
          <ProfileAvatar firstName={firstName} lastName={lastName} />
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={handleFirstNameIconClick}
            >
              {showFirstNameInput ? (
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Enter your First Name"
                />
              ) : (
                <Text>{firstName}</Text>
              )}
              {showFirstNameInput ? (
                <Icon
                  name="check" // during editing
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
              ) : (
                <Icon
                  name="pencil" //before editing
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TouchableOpacity
              style={styles.inputWrapper}
              onPress={handleLastNameIconClick}
            >
              {showLastNameInput ? (
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Enter your Last Name"
                />
              ) : (
                <Text>{lastName}</Text>
              )}
              {showLastNameInput ? (
                <Icon
                  name="check" // during editing
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
              ) : (
                <Icon
                  name="pencil" //before editing
                  size={20}
                  color="#000"
                  style={styles.icon}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>

            <View style={styles.inputWrapper}>
              <Text>{email}</Text>
            </View>
          </View>


          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={{ ...styles.changePasswordButton, marginBottom: -15 }}
              onPress={handleOpenEmailModal}
            >
              <Text style={styles.changePasswordText}>Change Email</Text>
            </TouchableOpacity>
          </View>

          {/* Email Change Modal */}
          <Modal
            visible={showEmailModal}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCloseEmailModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Change Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter new email"
                  keyboardType="email-address"
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter password"
                  secureTextEntry
                />
                {error && <Text>{error.message}</Text>}
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    onPress={handleChangeEmail}
                    style={styles.confirmButton}
                  >
                    <Text style={styles.buttonText}>Change</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleCloseEmailModal}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={() => setShowPasswordModal(true)}
          >
            <Text style={styles.changePasswordText}>Change Password</Text>
          </TouchableOpacity>
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={showPasswordModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Change Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Current Password"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New Password"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm New Password"
              secureTextEntry
            />
            {error && <Text>{error.message}</Text>}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                onPress={handleChangePassword}
                style={styles.confirmButton}
              >
                <Text style={styles.buttonText}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCancelPasswordChange}
                style={styles.cancelButton}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.myItemsButton} onPress={handleMyItemsClick}>
        <Text>My Items</Text>
      </TouchableOpacity>

      {showMyItemsModal && (
        <View style={styles.modalContainer}>
          <ItemPage onClose={handleCloseMyItemsModal} />
        </View>
      )}
    </SafeAreaView>
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
    textAlign: "center",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
  },
  logoutContainer: {
    width: "100%",
    alignItems: "center",
  },
  logoutButton: {
    display: "flex",
    width: 269,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#000",
  },
  logoutText: {
    color: "#fff",
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
    backgroundColor: "#888",
    borderRadius: 100,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    alignSelf: "center",
    width: 110,
    height: 50,
  },
  cancelButton: {
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    color: "#555",
    padding: 8,
    textAlign: "center",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,

    borderRadius: 5,
    padding: 5,
    borderColor: "transparent",
  },
  icon: {
    marginLeft: 10,
    position: "absolute",
    right: 10,
  },

  changePasswordButton: {
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

  changePasswordText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  myItemsButton: {
    position: "absolute",
    bottom: 2, 
    width: "100%",
    alignItems: "center",
  },

});

export default Profile;
