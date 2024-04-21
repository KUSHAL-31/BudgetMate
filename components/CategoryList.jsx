import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../utils/Colors";
import { useRouter } from "expo-router";

export default function CategoryList({ categoryList }) {
  // Function to handle the click event of category item
  const router = useRouter();
  const handleClick = (category) => {
    router.push({
      params: { categoryId: category.id },
      pathname: "/category-details",
    });
  };

  return (
    <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
        Latest Categories
      </Text>
      <View>
        {categoryList.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.container}
            onPress={() => handleClick(category)}
          >
            <View style={styles.iconContainer}>
              <Text
                style={[styles.iconText, { backgroundColor: category?.color }]}
              >
                {category?.icon}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "75%",
              }}
            >
              <View>
                <Text style={styles.categoryText}>{category?.name}</Text>
                <Text style={styles.itemCountText}>
                  {category?.BudgetCategoryItems?.length} Items
                </Text>
              </View>
              <Text style={styles.costText}>Rs {category?.budget}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "baseline",
  },
  iconText: {
    fontSize: 25,
    padding: 15,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 17,
    fontFamily: "outfit-bold",
  },
  itemCountText: {
    fontFamily: "outfit-regular",
  },
  costText: {
    fontFamily: "outfit-bold",
    fontSize: 14,
  },
});
