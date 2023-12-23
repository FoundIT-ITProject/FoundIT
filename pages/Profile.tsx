import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { User } from "firebase/auth";
import {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIREBASE_DB,
} from "../lib/firebaseConfig";
import ProfileAvatar from "../components/ProfileAvatar";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import ItemPage from "../components/ItemPage";
import { styles } from "../components/ui/Profile_Styles";

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
        <View style={{ marginBottom: 13 }}>
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
            <TouchableOpacity
              onPress={handleOpenEmailModal}
              style={styles.inputWrapper}
            >
              <Text style={styles.input}>{email}</Text>
              <Icon name="pencil" size={20} color="#000" style={styles.icon} />
            </TouchableOpacity>
          </View>
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

      <TouchableOpacity
        style={styles.myItemsButton}
        onPress={handleMyItemsClick}
      >
        <View style={styles.lostAndFoundBox}>
          <View style={styles.boxTop}></View>
          <Text style={styles.myItemsText}>My Items </Text>
        </View>
      </TouchableOpacity>

      {showMyItemsModal && (
        <View style={styles.modalContainer}>
          <ItemPage onClose={handleCloseMyItemsModal} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
