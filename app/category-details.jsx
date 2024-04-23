import { TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../utils/SupabaseConfig";
import { Ionicons } from "@expo/vector-icons";
import CategoryInfo from "../components/CategoryDetails/CategoryInfo";
import CategoryItemList from "../components/CategoryDetails/CategoryItemList";

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
    <View style={{ padding: 20, margin: 20 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={40} color="black" />
      </TouchableOpacity>
      <CategoryInfo categoryDetails={categoryDetails} />
      <CategoryItemList categoryDetails={categoryDetails} />
    </View>
  );
}
