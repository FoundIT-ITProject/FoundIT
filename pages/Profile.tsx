import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, doc, getDoc,setDoc, updateDoc } from 'firebase/firestore';
import {
     KeyboardAvoidingView,Alert,
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
import { EmailAuthProvider,getAuth,
                             updateProfile,
                             reauthenticateWithCredential,
                             updatePassword, } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';



const Profile = () => {
  const auth = getAuth(FIREBASE_APP);
   const currentUser = auth.currentUser;



  const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState(currentUser.email || "");
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



 useEffect(() => {
    async function fetchUserData() {
      try {
        const userDocRef = doc(FIREBASE_DB, "Users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setFirstName(userData.Voornaam || "");
          setLastName(userData.Achternaam || "");
          setEmail(userData.email || "");
          }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    }

    fetchUserData();
  }, []);



 const handleFirstNameUpdate = async () => {
    try {
      const userDocRef = doc(FIREBASE_DB, "Users", currentUser.uid);
      await setDoc(userDocRef, { Voornaam: firstName }, { merge: true });
      console.log("First Name Updated!");
    } catch (error) {
      console.error("Error updating first name:", error.message);
    }
  };
 const handleFirstNameIconClick = () => {
    setShowFirstNameInput((prev) => !prev);
    if (showFirstNameInput) handleFirstNameUpdate();
  };

  const handleLastNameUpdate = async () => {
    try {
      const userDocRef = doc(FIREBASE_DB, "Users", currentUser.uid);
      await setDoc(userDocRef, { Achternaam: lastName }, { merge: true });
      console.log("Last Name Updated!");
    } catch (error) {
      console.error("Error updating last name:", error.message);
    }
  };
const handleLastNameIconClick = () => {
    setShowLastNameInput((prev) => !prev);
    if (showLastNameInput) handleLastNameUpdate();
  };

const handleEmailIconClick = () => {
    setShowEmailInput((prev) => !prev);
    if (showEmailInput) handleChangeEmail();
  };

const handleOpenEmailModal = () => {
    setShowEmailModal(true);
  }
 const handleCloseEmailModal = () => {
       setShowEmailModal(false);
       setPassword("");
     };
const handleChangeEmail = async () => {
  try {
    const user = auth.currentUser;
    console.log("Current Email:", user.email);

    // Reauthenticate the user without asking for the password input again
    const credential = EmailAuthProvider.credential(user.email || "", password);
    await reauthenticateWithCredential(user, credential);
    console.log("Reauthenticated!");

    // Update the email
    await updateEmail(user, email);
    console.log("Email Updated!");
    setEmail(user.email || "");

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
     navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };


  return (
     <SafeAreaView style={styles.container}>
           <KeyboardAvoidingView behavior="padding" style={styles.container}>
             <View style={styles.avatarContainer}>
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
                       <Text style={styles.displayText}>{firstName}</Text>
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
                                      <Text style={styles.displayText}>{lastName}</Text>
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
                <Text style={styles.displayText}>{email}</Text>
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
            {error && <Text style={styles.errorText}>{error.message}</Text>}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleChangeEmail}
              >
                <Text style={styles.buttonText}>Change Email</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCloseEmailModal}
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
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
             <Text style={styles.heading}>Change Password</Text>
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
             {error && <Text style={styles.errorText}>{error.message}</Text>}
             <View style={styles.modalButtons}>
               <TouchableOpacity
                 style={styles.modalButton}
                 onPress={handleChangePassword}
               >
                 <Text style={styles.buttonText}>Change Password</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 style={styles.modalButton}
                 onPress={handleCancelPasswordChange}
               >
                 <Text style={styles.buttonText}>Cancel</Text>
               </TouchableOpacity>
             </View>
           </View>
         </View>
       </Modal>
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
    textAlign: "center",
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
     marginBottom: 20,

  },
  input: {
    fontSize: 16,
    color: "#555",
    padding: 8,
      textAlign: "center",
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    borderColor:'transparent',
alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 10, position: 'absolute', right: 10,
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
    textAlign: "center",
  },


});


export default Profile;
