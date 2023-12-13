import React, { useState, useEffect } from "react";
import { Text, FlatList, View } from "react-native";
import { supabase } from "../../../lib/supabase";
import { User } from "@supabase/supabase-js";

const RegularPage = () => {
  const [userEmails, setUserEmails] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user emails from Supabase when the component mounts
    const fetchUserEmails = async () => {
      const { data, error } = await supabase
        .from("auth.users")
        .select("email");

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
    <View>
      <Text>List of User Emails:</Text>
      <FlatList
        data={userEmails}
        keyExtractor={(email) => email}
        renderItem={({ item }) => (
          <View>
            <Text>Email: {item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default RegularPage;
