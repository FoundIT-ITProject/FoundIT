import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
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
      <View style={styles.cardContainer}>
        <ItemCard />
        <ItemCard />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',  // Rij-layout voor horizontale weergave
    flexWrap: 'wrap',      // Wrap naar de volgende rij als het niet past
    justifyContent: 'space-between',  // Verdeel de ruimte tussen de kaarten
  },
})



export default Home;
