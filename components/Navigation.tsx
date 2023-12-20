import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/(Auth)/Login";
import Register from "../pages/(Auth)/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import CreateItem from "../pages/CreateItem";
import ForgotPassword from "../pages/(Auth)/ForgotPassword";

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

import Users from "../pages/admin/Users";
import Regular from "../pages/admin/users/Regular";
import Owner from "../pages/admin/users/Owner";
import Admin from "../pages/admin/users/Admin";
import RegularDetailsPage from "../pages/admin/users/detail/RegularDetailsPage";

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
      <InsideStack.Screen name="Home Page" component={HomeStack} />
      <InsideStack.Screen name="Profile" component={Profile} />
      <InsideStack.Screen
        name="Users Panel"
        component={UsersAdmin}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
};

const UsersAdmin = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="Regular" component={Regular} />
      <Stack.Screen name="Owner" component={Owner} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="RegularDetailsPage" component={RegularDetailsPage} />
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
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: true, title: "Forgot Password" }}
      />
    </Stack.Navigator>
  );
};
