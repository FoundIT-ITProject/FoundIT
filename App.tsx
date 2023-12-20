import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  OutsideNavigation,
  AdminNavigation,
  OwnerNavigation,
  UserNavigation,
} from "./components/Navigation";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "./lib/firebaseConfig";
import React from "react";
import { doc, getDoc } from "firebase/firestore";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      setUser(authUser);
      if (authUser) {
        getUserRole(authUser.uid);
      }
    });

    // Cleanup: unsubscribe from the auth state change listener
    return () => unsubscribe();
  }, []);

  async function getUserRole(uid: string) {
    const roleRef = doc(FIREBASE_DB, "Users", uid);

    try {
      const docSnap = await getDoc(roleRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserRole(userData?.role || "user");
      } else {
        console.log("User not found");
      }
    } catch (e) {
      console.error("Error fetching user data:", e);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user && userRole === "Admin" ? (
          <Stack.Screen
            name="AdminPage"
            component={AdminNavigation}
            options={{ headerShown: false }}
          />
        ) : user && userRole === "User" ? (
          <Stack.Screen
            name="InsideStackScreen"
            component={UserNavigation}
            options={{ headerShown: false }}
          />
        ) : user && userRole === "Owner" ? (
          <Stack.Screen
            name="OwnerStack"
            component={OwnerNavigation}
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
