import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import services from "../../utils/services";
import { client } from "../../utils/KindeConfig";
import { supabase } from "../../utils/SupabaseConfig";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../utils/Colors";
import CircleChart from "../../components/CircleChart";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const router = useRouter();

  // This function is used to logout the user
  const logoutClick = async () => {
    const loggedOut = await client.logout(true);
    if (loggedOut) {
      await services.storeData("login", "false");
      router.replace("/login");
    }
  };

  // This function is used to get the budget category

  const getBudgetCategory = async () => {
    const user = await client.getUserDetails();
    // Get the budget category by the user email
    const { data, error } = await supabase
      .from("BudgetCategory")
      .select("*")
      .eq("created_by", user.email);
    console.log(data);
  };

  // This useEffect hook is used to check if the user is authenticated when the component is mounted
  useEffect(() => {
    checkAuthenticatedUser();
    getBudgetCategory();
  }, []);

  // This function is used to check if the user is authenticated

  const checkAuthenticatedUser = async () => {
    const result = await services.getData("login");
    console.log("result", result);
    if (result !== "true") {
      // If the user is not authenticated, redirect to the login page
      router.replace("/login");
    }
  };

  return (
    <View style={{ marginTop: 20, flex: 1 }}>
      <View style={styles.container}>
        <Header />
        <CircleChart />
      </View>
      <Link style={styles.addButton} href={"/add-new-category"}>
        <Ionicons name="add-circle" size={54} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    padding: 20,
    backgroundColor: Colors.PRIMARY,
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
