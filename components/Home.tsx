import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import ItemCard from "./ui/ItemCard";

const Home = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Hey hallo {session?.user.email}!</Text>
      <ItemCard></ItemCard>
    </View>
  );
};

export default Home;
