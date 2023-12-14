import React, { useState, useEffect } from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import { supabase } from "../../../lib/supabase";
import { User } from "@supabase/supabase-js";

const RegularPage = () => {
  const [userEmails, setUserEmails] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user emails from Supabase when the component mounts
    const fetchUserEmails = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "User"); // Filter by role "User"

      if (error) {
        console.error("Error fetching user emails:", error.message);
      } else {
        // Extract emails from the fetched data
        const emails = data?.map((value) => value.email) || [];
        setUserEmails(emails);
      }
    };

    fetchUserEmails();
  }, []);

  return (
    <View style={styles.cardContainer}>
      <FlatList
        data={userEmails}
        keyExtractor={(email) => email}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default RegularPage;
