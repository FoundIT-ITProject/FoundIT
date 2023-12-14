import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/(Auth)/Login";
import Register from "../pages/(Auth)/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

import Users from "../pages/admin/Users";
import Regular from "../pages/admin/users/Regular";
import Owner from "../pages/admin/users/Owner";
import Admin from "../pages/admin/users/Admin";


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
      <InsideStack.Screen name="Home" component={Home} />
      <InsideStack.Screen name="Profile" component={Profile} />
      <InsideStack.Screen name="Users" component={Users} />

    </InsideStack.Navigator>
  );
};

const UsersStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Regular" component={Regular} />
      <Stack.Screen name="Owner" component={Owner} />
      <Stack.Screen name="Admin" component={Admin} />
    </Stack.Navigator>
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
