import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import ItemCard from "../components/ui/ItemCard";

const Home = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  


  return (
      
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </ScrollView>

      
    
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 100,
    paddingBottom: 100,
    flexDirection: 'row',  // Rij-layout voor horizontale weergave
    flexWrap: 'wrap', 
    // flexBasis: 50,     // Wrap naar de volgende rij als het niet past
     justifyContent: 'center',
     gap: 5, // Verdeel de ruimte tussen de kaarten
  },
})



export default Home;
