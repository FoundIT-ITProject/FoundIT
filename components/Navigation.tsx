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
import ItemDetail from "./ItemDetail";

function HomeStack() {
  const HomeInsideStack = createNativeStackNavigator();

  return (
    <HomeInsideStack.Navigator>
      <HomeInsideStack.Screen name="Home" component={Home} />
      <HomeInsideStack.Screen name="ItemDetail" component={ItemDetail} />
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

// Inside The Admin role Page
import Users from "../pages/admin/Users";
import Regular from "../pages/admin/users/Regular";
import Owner from "../pages/admin/users/Owner";
import Admin from "../pages/admin/users/Admin";
import RegularDetailsPage from "../pages/admin/users/detail/RegularDetailsPage";
import AdminDetailsPage from "../pages/admin/users/detail/AdminDetailsPage";

// Admin menu role
import HomeAdmin from "../pages/admin/HomeAdmin";
import ItemDetailAdmin from "../pages/admin/ItemdetailAdmin";

// Role Pages

export const UserNavigation = () => {
  const UserStack = createBottomTabNavigator();

  return (
    <UserStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FCA311",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <UserStack.Screen
        name="Home Page"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <UserStack.Screen name="Profile" component={Profile} />
    </UserStack.Navigator>
  );
};

const UsersStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="Regular" component={Regular} />
      <Stack.Screen name="Owner" component={Owner} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="RegularDetailsPage" component={RegularDetailsPage} />
      <Stack.Screen name="AdminDetailsPage" component={AdminDetailsPage} />
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

export const AdminNavigation = () => {
  const AdminStack = createBottomTabNavigator();

  return (
    <AdminStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Managment") {
            iconName = focused ? "people" : "people-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FCA311",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <AdminStack.Screen name="Home Page" component={AdminHomeStack} />
      <AdminStack.Screen name="Profile" component={Profile} />
      <AdminStack.Screen
        name="Managment"
        component={UsersStack}
        options={{ headerShown: false }}
      />
    </AdminStack.Navigator>
  );
};

const AdminHomeStack = () => {
  const AdminHomeStack = createNativeStackNavigator();

  return (
    <AdminHomeStack.Navigator>
      <AdminHomeStack.Screen name="Home" component={HomeAdmin} />
      <AdminHomeStack.Screen
        name="ItemDetailAdmin"
        component={ItemDetailAdmin}
      />
      <AdminHomeStack.Group screenOptions={{ presentation: "modal" }}>
        <AdminHomeStack.Screen
          name="UploadItem"
          component={CreateItem}
          options={{ headerShown: false }}
        />
      </AdminHomeStack.Group>
    </AdminHomeStack.Navigator>
  );
};

export const OwnerNavigation = () => {
  const OwnerStack = createBottomTabNavigator();

  return (
    <OwnerStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FCA311",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <OwnerStack.Screen name="Home Page" component={HomeStack} />
      <OwnerStack.Screen name="Profile" component={Profile} />
    </OwnerStack.Navigator>
  );
};
