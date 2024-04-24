import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function HomeLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "outfit-regular": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  return fontsLoaded ? (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-new-category"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Add New Category",
        }}
      />
      <Stack.Screen
        name="add-new-item"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Add New Item",
        }}
      />
    </Stack>
  ) : (
    <Text>Loading...</Text>
  );
}
