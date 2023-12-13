import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./pages/Auth";
import { Session } from "@supabase/supabase-js";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateItemButton from "./components/CreateItemButton";
import CreateItem from "./pages/CreateItem";

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

  function HomeStack() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <CreateItemButton
                onPress={() => {
                  navigation.navigate("CreateItem");
                }}
              />
            ),
          }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="CreateItem" component={CreateItem} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {session ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Authed"
            component={HomeStack}
            options={{
              headerShown: false,
            }}
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
