import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Colors from "../../utils/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { client } from "../../utils/KindeConfig";

export default function Profile() {
  const logoutUser = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          const loggedOut = await client.logout(true);
          if (loggedOut) {
            await services.storeData("login", "false");
            router.replace("/login");
          }
        },
      },
    ]);
  };

  return (
    <View style={{ marginTop: 20, flex: 1 }}>
      <View style={styles.header}>
        <FontAwesome6 name="contact-card" size={24} color={Colors.white} />
        <Text style={styles.headingText}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.profileButton}
          onPress={() => logoutUser()}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  headingText: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileButton: {
    width: "90%",
    padding: 10,
    backgroundColor: Colors.grey,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "outfit-bold",
    color: Colors.white,
  },
});
