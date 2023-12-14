import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList} from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import ItemCard from "../components/ui/ItemCard";
import SearchBar from "../components/ui/SearchBar";

const Home = () => {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const fetchItem = async () =>{
      try{
        const {data, error} = await supabase.from('Items').select('*');
        if (error) {
          console.error('Fout bij ophalen van gegevens: ', error);
        }
        else{
          console.log('Opgehaalde gegevens: ', data);
          
        }
      }catch (error: any)
      {
        console.error('Onverwachtte fout: ', error.message);
      }
      
     
    }

    fetchItem();
  },[])


  return (
      
    <ScrollView contentContainerStyle={styles.cardContainer}>
    <SearchBar/>
    {items.map((item, index) => (
        <ItemCard
          key={index}
          item={{
            item_name: item.item_name,
            item_image: item.item_image,
          }}
        />
      ))}
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
