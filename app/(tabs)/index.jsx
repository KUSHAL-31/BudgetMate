import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import services from "../../utils/services";
import { client } from "../../utils/KindeConfig";
import { supabase } from "../../utils/SupabaseConfig";
import Header from "../../components/Header";
import Colors from "../../utils/Colors";
import CircleChart from "../../components/CircleChart";
import { Ionicons } from "@expo/vector-icons";
import CategoryList from "../../components/CategoryList";

export default function Home() {
  const router = useRouter();

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  // This function is used to get the budget category

  const getBudgetCategory = async () => {
    setLoading(true);
    const user = await client.getUserDetails();
    // Get the budget category by the user email
    const { data, error } = await supabase
      .from("BudgetCategory")
      .select("*,BudgetCategoryItems(*)")
      .eq("created_by", user.email);
    if (data) {
      setCategoryList(data);
      setLoading(false);
    }
  };

  // This useEffect hook is used to check if the user is authenticated when the component is mounted
  useEffect(() => {
    checkAuthenticatedUser();
    getBudgetCategory();
  }, []);

  // This function is used to navigate to the add category page
  const onAddCategoryClick = () => {
    // Check to see if user has reached the maximum number of categories allowed (5)
    if (categoryList.length >= 5) {
      Alert.alert(
        "Premium version coming soon to add more than five categories"
      );
      return;
    }
    router.replace("/add-category");
  };

  // This function is used to check if the user is authenticated

  const checkAuthenticatedUser = async () => {
    const result = await services.getData("login");
    if (result !== "true") {
      // If the user is not authenticated, redirect to the login page
      router.replace("/login");
    }
  };

  return (
    <View style={{ marginTop: 20, flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getBudgetCategory()}
          />
        }
      >
        <View style={styles.container}>
          <Header />
        </View>
        <View style={{ padding: 20, marginTop: -75 }}>
          {categoryList && <CircleChart categoryList={categoryList} />}
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => onAddCategoryClick()}
      >
        <Ionicons name="add-circle" size={54} color={Colors.PRIMARY} />
      </TouchableOpacity>
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
