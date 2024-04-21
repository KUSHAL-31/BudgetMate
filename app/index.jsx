import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import services from "../utils/services";
import { client } from "../utils/KindeConfig";

export default function Home() {
  const router = useRouter();

  // This function is used to logout the user
  const logoutClick = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await services.storeData("login", "false");
      router.replace("/login");
    }
  };

  // This useEffect hook is used to check if the user is authenticated when the component is mounted
  useEffect(() => {
    checkAuthenticatedUser();
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
    <View>
      <Text>Home</Text>
      <Button title="Logout" onPress={logoutClick} />
    </View>
  );
}
