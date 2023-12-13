import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./pages/Auth";
import { Session } from "@supabase/supabase-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateItemButton from "./components/CreateItemButton";

import Regular from "./pages/admin/users/Regular";
import Owner from "./pages/admin/users/Owner";
import Admin from "./pages/admin/users/Admin";


export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      {session ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Regular}
            options={{ headerRight: () => <CreateItemButton /> }}
          />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Tab.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
