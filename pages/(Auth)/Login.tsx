import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: RouterProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("email");
        const savedRememberMe = await AsyncStorage.getItem("rememberMe");

        if (savedEmail) {
          setEmail(savedEmail);
          setRememberMe(savedRememberMe === "true");
        }
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    };

    loadSavedData();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("rememberMe", rememberMe.toString());
      } else {
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("rememberMe");
      }

      console.log("Login Succeed!");
    } catch (error: any) {
      console.log("Login Failed!", error.message);
    } finally {
      setLoading(false);
      setName("");
      setPassword("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <View style={styles.inputContainer}>
            <Text>Remember Me</Text>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              style={styles.switch}
            />
          </View>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handleLogin}
          >
            <Text> Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate("Register")}
          >
            <Text> Create an account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text>Forgot Password?</Text>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    width: 80,
    marginBottom: 5,
  },
  input: {
    flex: 1,
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
  switch: {
    marginLeft: 10,
  },
});

export default Login;
