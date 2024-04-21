import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import LoginBg from "../../assets/images/loginBg1.jpg";
import Colors from "../../utils/Colors";
import { client } from "../../utils/KindeConfig";
import services from "../../utils/services";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const loginClick = async () => {
    try {
      const token = await client.login();
      if (token) {
        // If the user is authenticated, store the token in the local storage
        await services.storeData("login", "true");
        // Redirect to the home page
        router.replace("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image source={LoginBg} style={styles.bgImage} />
      <View style={styles.loginDiv}>
        <Text style={styles.loginTitle}>Personal Budget planner</Text>
        <Text style={styles.loginTag}>
          Stay updated as each penny matters : Your personal BudgetMate!
        </Text>
        <TouchableOpacity style={styles.loginBtn} onPress={loginClick}>
          <Text style={{ textAlign: "center", color: Colors.PRIMARY }}>
            Login / Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    width: "50%",
    height: "50%",
    marginTop: 30,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: Colors.black,
  },
  loginDiv: {
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    height: "50%",
    padding: 20,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  loginTitle: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
  },
  loginTag: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.white,
    marginTop: 20,
  },
  loginBtn: {
    backgroundColor: Colors.white,
    padding: 15,
    paddingHorizontal: 5,
    borderRadius: 50,
    marginTop: 30,
  },
});
