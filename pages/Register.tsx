import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Button, CheckBox } from "react-native-elements";
import { supabase } from "../lib/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);

  const handleRegistration = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
      password: password,
      });

      if (error) {
        Alert.alert("Registration Error", error.message);
      } else if (data && data.user) {
        const { error: metadataError } = await supabase
          .from("users")
          .upsert([
            {
              id: data.user.id, 
              email,
              first_name: firstName, // Aangepaste naam voor databasekolom
              last_name: lastName, // Aangepaste naam voor databasekolom
              role: getSelectedRole(),
            },
          ]);

        if (metadataError) {
          console.error("Error updating user metadata:", metadataError.message);
          Alert.alert("Metadata Update Error");
        } else {
          Alert.alert("Registration Successful", "Please check your email for verification.");
        }
      }
    } catch (error) {
      console.error("Error during registration:", (error as Error).message);
      Alert.alert("Registration Error");
    }
  };

  const getSelectedRole = () => {
    if (isAdmin) {
      return "Admin";
    } else if (isBusinessOwner) {
      return "BusinessOwner";
    } else if (isUser) {
      return "User";
    } else {
      return "DefaultRole";
    }
  };

  return (
    <View style={styles.container}>
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
      <Input
        label="First Name"
        leftIcon={{ type: "font-awesome", name: "user" }}
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
        placeholder="Your first name"
        autoCapitalize="words"
      />
      <Input
        label="Last Name"
        leftIcon={{ type: "font-awesome", name: "user" }}
        onChangeText={(text) => setLastName(text)}
        value={lastName}
        placeholder="Your last name"
        autoCapitalize="words"
      />
      <CheckBox
        title="Admin"
        checked={isAdmin}
        onPress={() => setIsAdmin(!isAdmin)}
      />
      <CheckBox
        title="User"
        checked={isUser}
        onPress={() => setIsUser(!isUser)}
      />
      <CheckBox
        title="Business Owner"
        checked={isBusinessOwner}
        onPress={() => setIsBusinessOwner(!isBusinessOwner)}
      />
      <Button
        title="Register"
        onPress={handleRegistration}
        buttonStyle={styles.registerButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
  },
});
