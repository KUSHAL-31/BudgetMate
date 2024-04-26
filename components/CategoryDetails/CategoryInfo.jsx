import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/Colors";

export default function CategoryInfo({ categoryDetails }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    categoryDetails && calculateCategoryCost();
  }, [categoryDetails]);

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
        <Ionicons name="trash" size={24} color="red" />
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
