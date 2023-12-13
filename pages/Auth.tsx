// Importeer de nodige dingen
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input, CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native"; // Voeg de navigatie-hook toe


export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation(); // Haal de navigatiefunctie op

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
        <CheckBox
          title="Remember Me"
          checked={rememberMe}
          onPress={toggleRememberMe}
          containerStyle={styles.checkBoxContainer}
        />
        <Button
          title="Sign in"
          disabled={loading}
          onPress={signInWithEmail}
          buttonStyle={styles.signInButton}
        />
        {/* Knop om naar de registratiepagina te navigeren */}
        <Button
          title="Create Account"
          disabled={loading}
          onPress={() => navigation.navigate("Register" as never)} // Navigeer naar de registratiepagina
          buttonStyle={styles.signUpButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  signInButton: {
    marginTop: 20,
    backgroundColor: "#2196F3", // Groene kleur (je kunt aanpassen)
  },
  signUpButton: {
    marginTop: 10,
    backgroundColor: "#2196F3", // Blauwe kleur (je kunt aanpassen)
  },
});
