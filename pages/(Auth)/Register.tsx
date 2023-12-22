// Importeer de vereiste modules en functies
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH } from "../../lib/firebaseConfig";

// Definieer de functie voor het registreren van een gebruiker
const Register = () => {
  // States voor invoervelden, laadstatus, foutmelding en gebruikersrol
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isUser, setIsUser] = useState(true);
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);

  // Firebase Authentication
  const auth = FIREBASE_AUTH;

  // Functie om registratiegegevens naar Firebase en Firestore te sturen
  const handleRegister = async () => {
    setLoading(true);

    try {
      // Stap 1: Maak gebruiker aan in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Stap 2: Update gebruikersprofiel in Firebase Authentication
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Stap 3: Verzend aanvullende informatie naar Firestore
      const db = getFirestore();
      const userDocRef = doc(db, "Users", userCredential.user.uid);

      // Verzamel gebruikersgegevens om naar Firestore te sturen
      const userData = {
        UID: userCredential.user.uid,
        Voornaam: firstName,
        Achternaam: lastName,
        email: email,
        role: isBusinessOwner ? "Owner" : "User",
      };

      // Set gebruikersgegevens, inclusief de rol
      await setDoc(userDocRef, userData);

      console.log("Registratie geslaagd!");
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  };

  // Opmaak en stijlen voor de registratiepagina
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      paddingBottom: 100,
    },
    keyboardAvoidingContainer: {
      flex: 1,
    },
    form: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      borderRadius: 5,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    errorText: {
      color: "#FF0000",
      textAlign: "center",
      marginTop: 10,
    },
    defaultText: {
      color: "black",
      textAlign: "center",
      marginTop: 10,
    },
    button: {
      backgroundColor: "#007AFF",
      borderRadius: 5,
      padding: 10,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  // Render de registratiepagina
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.form}>
          <Text style={styles.heading}>Register</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="User"
              checked={isUser}
              onPress={() => {
                setIsUser(!isUser);
                setIsBusinessOwner(false);
              }}
            />
            <CheckBox
              title="Business Owner"
              checked={isBusinessOwner}
              onPress={() => {
                setIsBusinessOwner(!isBusinessOwner);
                setIsUser(false);
              }}
            />
          </View>

          <Text style={error ? styles.errorText : styles.defaultText}>
            {error ? error.message : "Please fill in the blanks"}
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Exporteer de registratiepagina
export default Register;
