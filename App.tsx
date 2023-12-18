import { useState, useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { InsideNavigation, OutsideNavigation } from "./components/Navigation";

import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./lib/firebaseConfig";
import React from "react";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="InsideStackScreen"
            component={InsideNavigation}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="OutsideStackScreen"
            component={OutsideNavigation}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
