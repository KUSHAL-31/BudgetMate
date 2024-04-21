import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function CategoryDetails() {
  // Get the category id from the URL
  const { categoryId } = useLocalSearchParams();

  return (
    <View>
      <Text>{categoryId}details</Text>
    </View>
  );
}
