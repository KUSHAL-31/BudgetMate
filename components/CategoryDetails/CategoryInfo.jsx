import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/Colors";
import { supabase } from "../../utils/SupabaseConfig";
import { useRouter } from "expo-router";

export default function CategoryInfo({ categoryDetails }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const router = useRouter();

  useEffect(() => {
    categoryDetails && calculateCategoryCost();
  }, [categoryDetails.id]);

  // Function to calculate the total cost of the category
  const calculateCategoryCost = () => {
    setPercentage(0);
    let total = 0;
    categoryDetails?.BudgetCategoryItems?.map((item) => {
      total += item.cost;
    });
    setTotalAmount(total);
    var percentage = (total / categoryDetails.budget) * 100;
    if (percentage > 100) {
      percentage = 100;
    }
    setPercentage(percentage);
  };

  // Function to delete the category
  const deleteCategory = () => {
    // Add the code to delete the category here
    Alert.alert(
      "Delete Category",
      "Are you sure you want to delete this category?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              // Code to delete the category
              // Delete the images from the storage first
              const { data, error } = await supabase
                .from("BudgetCategoryItems")
                .select("image")
                .eq("budget_category_id", categoryDetails.id);
              for (var item of data) {
                if (item.image.includes("/public/images/")) {
                  const imagePath = item.image.split("/public/images/")[1];
                  const res = await supabase.storage
                    .from("images")
                    .remove([imagePath]);
                }
              }
              if (error) {
                ToastAndroid.show(
                  "Something went wrong. Please try again later.",
                  ToastAndroid.SHORT
                );

                // Redirect to the home page
                router.replace("/(tabs)");
              }
              // Delete the items and the category
              await supabase
                .from("BudgetCategoryItems")
                .delete()
                .eq("budget_category_id", categoryDetails.id);
              await supabase
                .from("BudgetCategory")
                .delete()
                .eq("id", categoryDetails.id);
              ToastAndroid.show(
                "Category deleted successfully",
                ToastAndroid.SHORT
              );

              // Redirect to the home page
              router.replace("/(tabs)");
            } catch (error) {
              ToastAndroid.show("Something went wrong.", ToastAndroid.SHORT);
            }
          },
        },
      ]
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text
            style={[
              styles.iconText,
              { backgroundColor: categoryDetails?.color },
            ]}
          >
            {categoryDetails?.icon}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.categoryText}>{categoryDetails?.name}</Text>
          <Text style={styles.categoryItemText}>
            {categoryDetails?.BudgetCategoryItems?.length} Items
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={() => deleteCategory()}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={{ fontFamily: "outfit-regular" }}>Rs {totalAmount}</Text>
        <Text style={{ fontFamily: "outfit-regular" }}>
          Total Budget : {categoryDetails?.budget}
        </Text>
      </View>
      <View style={styles.progressBarMain}>
        <View
          style={[styles.subProgressBar, { width: percentage + "%" }]}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconText: {
    fontSize: 23,
    padding: 20,
    borderRadius: 15,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  categoryText: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  categoryItemText: {
    fontFamily: "outfit-regular",
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  progressBarMain: {
    width: "100%",
    height: 15,
    backgroundColor: Colors.grey,
    borderRadius: 99,
    marginTop: 7,
  },
  subProgressBar: {
    height: 15,
    borderRadius: 99,
    backgroundColor: Colors.PRIMARY,
  },
});
