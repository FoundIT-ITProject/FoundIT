import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/(Auth)/Login";
import Register from "../pages/(Auth)/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import CreateItem from "../pages/CreateItem";

function HomeStack() {
  const HomeInsideStack = createNativeStackNavigator();

  return (
    <HomeInsideStack.Navigator>
      <HomeInsideStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeInsideStack.Group screenOptions={{ presentation: "modal" }}>
        <HomeInsideStack.Screen
          name="UploadItem"
          component={CreateItem}
          options={{ headerShown: false }}
        />
      </HomeInsideStack.Group>
    </HomeInsideStack.Navigator>
  );
}

export const InsideNavigation = ({ navigation }: any) => {
  const InsideStack = createBottomTabNavigator();

  return (
    <InsideStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "calendar" : "calendar-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FCA311",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <InsideStack.Screen name="HomeStack" component={HomeStack} />
      <InsideStack.Screen name="Profile" component={Profile} />
    </InsideStack.Navigator>
  );
};

export const OutsideNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: true, headerBackVisible: true }}
      />
    </Stack.Navigator>
  );
};
