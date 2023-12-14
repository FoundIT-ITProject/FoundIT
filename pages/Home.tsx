import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CreateItemButton from "../components/CreateItemButton";

const Home = () => {
  const [session, setSession] = useState<Session | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <CreateItemButton
        onPress={() => {
          navigation.navigate("CreateItem");
        }}
      />
      <Text>Welcome to the Home Screen {session?.user.id}!</Text>
    </View>
  );
};

export default Home;
