import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gtjwsgfkbujrlmcpaies.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0andzZ2ZrYnVqcmxtY3BhaWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzODkzNjIsImV4cCI6MjAxNzk2NTM2Mn0.-EpKJSh5FIEbys4-zx2SFqXAqOq2nE4OZh18mkMjBIk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
