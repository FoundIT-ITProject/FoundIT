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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../lib/firebaseConfig";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: RouterProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Succeed!");
    } catch (error: any) {
      console.log("Login Failed!", error.message);
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={styles.form}>
        <Text style={styles.heading}>Log In</Text>
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
        <TouchableOpacity style={styles.TouchableOpacity} onPress={handleLogin}>
          <Text> Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.TouchableOpacity}
          onPress={() => navigation.navigate("Register")}
        >
          <Text> Create an account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  form: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  TouchableOpacity: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default Login;
