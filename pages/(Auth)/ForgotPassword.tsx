import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebaseConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const auth = FIREBASE_AUTH;

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent!");
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.form}>
          <Text style={styles.heading}>Reset Password</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
          </View>
          <Text style={error ? styles.errorText : styles.defaultText}>
            {error ? error.message : "Please enter your email"}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleResetPassword}
            disabled={loading || !email}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
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
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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

export default ForgotPassword;
