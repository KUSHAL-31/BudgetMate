import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { client } from "../utils/KindeConfig";
import Colors from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const [user, setUser] = useState(null);

  // This function is used to get the user details
  const getUserDetails = async () => {
    const user = await client.getUserDetails();
    setUser(user);
  };

  // This useEffect hook is used to get the user details when the component is mounted
  useEffect(() => {
    getUserDetails();
  }, []);

  // This function is used to get the current time
  const getCurrentTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 4) {
      return "Night";
    } else if (currentHour < 12) {
      return "Morning";
    } else if (currentHour < 19) {
      return "Evening";
    } else {
      return "Night";
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
      }}
    >
      <View>
        <Image source={{ uri: user?.picture }} style={styles.userImage} />
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "85%",
        }}
      >
        <View>
          <Text style={styles.greetingText}>Good {getCurrentTime()}!</Text>
          <Text style={styles.userName}>{user?.given_name}</Text>
        </View>
        <Ionicons name="notifications" size={24} color={Colors.white} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  greetingText: {
    color: Colors.white,
    fontSize: 16,
  },
  userName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});
