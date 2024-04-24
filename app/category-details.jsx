import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../utils/SupabaseConfig";
import { Ionicons } from "@expo/vector-icons";
import CategoryInfo from "../components/CategoryDetails/CategoryInfo";
import CategoryItemList from "../components/CategoryDetails/CategoryItemList";
import Colors from "../utils/Colors";

export default function CategoryDetails() {
  // Get the router object
  const router = useRouter();
  // Get the category id from the URL
  const { categoryId } = useLocalSearchParams();

  const [categoryDetails, setCategoryDetails] = useState({});

  useEffect(() => {
    getCategoryDetails();
  }, []);

  const getCategoryDetails = async () => {
    // Fetch the category details from the database
    const { data, error } = await supabase
      .from("BudgetCategory")
      .select("*,BudgetCategoryItems(*)")
      .eq("id", categoryId);
    if (data) {
      setCategoryDetails(data[0]);
    }
  };

  return (
    <View style={{ padding: 20, margin: 20, flex: 1 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <CategoryInfo categoryDetails={categoryDetails} />
      <CategoryItemList categoryDetails={categoryDetails} />
      <Link
        style={styles.addButton}
        href={{ pathname: "/add-new-item", params: { categoryId: categoryId } }}
      >
        <Ionicons name="add-circle" size={60} color={Colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
