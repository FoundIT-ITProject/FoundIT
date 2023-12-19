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

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebaseConfig";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [isUser, setIsUser] = useState(true);
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleRegister = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser!, {
        displayName: name,
      });

      console.log("Registration Succeed!");
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.form}>
          <Text style={styles.heading}>Register</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
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
    marginBottom: 8, // Increased space between labels
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

export default Register;
