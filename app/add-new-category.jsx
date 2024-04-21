import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Colors from "../utils/Colors";
import ColorPicker from "../components/ColorPicker";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { supabase } from "../utils/SupabaseConfig";
import { client } from "../utils/KindeConfig";
import { useRouter } from "expo-router";

export default function AddNewCategory() {
  const router = useRouter();
  // State to store the selected icon, color, category name and total budget
  const [selectedIcon, setSelectedIcon] = useState("Ic");
  const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);
  const [category, setCategory] = useState("");
  const [totalBudget, setTotalBudget] = useState("");

  // Function to add a new category to the database
  const handleAddCategory = async () => {
    // Get the user details
    const user = await client.getUserDetails();
    // Insert the new category into the database
    const { data, error } = await supabase
      .from("BudgetCategory")
      .insert([
        {
          name: category,
          budget: totalBudget,
          icon: selectedIcon,
          color: selectedColor,
          created_by: user.email,
        },
      ])
      .select();
    if (data) {
      router.replace({
        params: { categoryId: data[0].id },
        pathname: "/category-details",
      });
      ToastAndroid.show("Category added successfully", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={[styles.categoryIconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(text) => setSelectedIcon(text)}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </View>
      {/* Add category name and total budget section */}
      <View style={styles.inputText}>
        <MaterialIcons name="local-offer" size={24} color={Colors.grey} />
        <TextInput
          style={{
            padding: 0,
            margin: 0,
            width: "100%",
            fontSize: 17,
            fontFamily: "outfit-regular",
          }}
          onChangeText={(text) => setCategory(text)}
          placeholder="Category Name"
        />
      </View>
      <View style={styles.inputText}>
        <Foundation name="dollar" size={34} color={Colors.grey} />
        <TextInput
          style={{
            padding: 0,
            margin: 0,
            width: "100%",
            fontSize: 17,
            fontFamily: "outfit-regular",
          }}
          onChangeText={(text) => setTotalBudget(text)}
          keyboardType="numeric"
          placeholder="Total budget"
        />
      </View>
      <TouchableOpacity
        onPress={handleAddCategory}
        activeOpacity={0.7}
        style={styles.addButton}
        disabled={category === "" || totalBudget === ""}
      >
        <Text
          style={{ textAlign: "center", fontSize: 16, color: Colors.white }}
        >
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryIconInput: {
    textAlign: "center",
    fontSize: 30,
    padding: 20,
    borderRadius: 100,
    paddingHorizontal: 28,
    color: Colors.white,
  },
  inputText: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 14,
    borderRadius: 10,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    marginTop: 30,
  },
  addButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
});
