import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Colors from "../utils/Colors";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { supabase } from "../utils/SupabaseConfig";
import { decode } from "base64-arraybuffer";
import { useLocalSearchParams, useRouter } from "expo-router";

const defaultImage =
  "https://www.aputf.org/wp-content/uploads/2015/06/default-placeholder1-1024x1024-570x321.png";

export default function AddNewItem() {
  const [image, setImage] = useState(defaultImage);
  const [previewImage, setPreviewImage] = useState(defaultImage);
  const [itemDetails, setItemDetails] = useState({
    name: "",
    cost: 0,
    url: null,
    note: null,
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Get the category id from the URL
  const { categoryId } = useLocalSearchParams();

  const onImageClick = async () => {
    // Add the code to open the image picker here
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
      setImage(result.assets[0].base64);
    }
  };

  const isBudgetExceeded = async (cost) => {
    // Check budget of the category
    const res1 = await supabase
      .from("BudgetCategory")
      .select("budget")
      .eq("id", categoryId);
    const budget = res1.data[0].budget;
    // Calculate total cost of all the category items
    const res2 = await supabase
      .from("BudgetCategoryItems")
      .select("cost")
      .eq("budget_category_id", categoryId);
    var totalCost = 0;
    res2.data.forEach((item) => {
      totalCost += item.cost;
    });
    // Check if the cost of the new item exceeds the budget
    if (totalCost + parseInt(cost) > budget) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddItemClick = async () => {
    if (!(await isBudgetExceeded(itemDetails?.cost))) {
      var isImageSelected = image !== defaultImage;
      setLoading(true);
      var fileUrl = defaultImage;
      if (isImageSelected) {
        const fileName = Date.now().toString();
        // Add the code to add the item to the database here
        const { data, error } = await supabase.storage
          .from("images")
          .upload(`${fileName}.png`, decode(image), {
            contentType: "image/png",
          });
        if (data) {
          fileUrl = `${process.env.EXPO_PUBLIC_BUCKET_URL}${fileName}.png`;
        }
      }

      const { data2, error2 } = await supabase
        .from("BudgetCategoryItems")
        .insert([
          {
            name: itemDetails.name,
            cost: itemDetails.cost,
            url: itemDetails.url,
            note: itemDetails.note,
            image: fileUrl,
            budget_category_id: categoryId,
          },
        ]);
      ToastAndroid.show("Item added successfully", ToastAndroid.SHORT);
      setLoading(false);
      router.replace({
        params: { categoryId: categoryId },
        pathname: "/category-details",
      });
    } else {
      ToastAndroid.show(
        "Budget exceeded. Please add an item within the budget.",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={{ padding: 20 }}>
        <TouchableOpacity onPress={onImageClick}>
          <Image style={styles.itemImage} source={{ uri: previewImage }} />
        </TouchableOpacity>
        <View style={styles.textInput}>
          <Ionicons name="pricetag" size={24} color={Colors.grey} />
          <TextInput
            placeholder="Item Name"
            style={styles.input}
            onChangeText={(text) =>
              setItemDetails({ ...itemDetails, name: text })
            }
          />
        </View>
        <View style={styles.textInput}>
          <FontAwesome name="dollar" size={24} color={Colors.grey} />
          <TextInput
            placeholder="Cost"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) =>
              setItemDetails({ ...itemDetails, cost: text })
            }
          />
        </View>
        <View style={styles.textInput}>
          <Ionicons name="link" size={24} color={Colors.grey} />
          <TextInput
            placeholder="URL"
            style={styles.input}
            onChangeText={(text) =>
              setItemDetails({ ...itemDetails, url: text })
            }
          />
        </View>
        <View style={styles.textInput}>
          <Ionicons name="pencil" size={24} color={Colors.grey} />
          <TextInput
            placeholder="Note"
            style={styles.input}
            numberOfLines={3}
            onChangeText={(text) =>
              setItemDetails({ ...itemDetails, note: text })
            }
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addButton}
          disabled={
            itemDetails.name === "" || itemDetails.cost === "" || loading
          }
          onPress={() => handleAddItemClick()}
        >
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text
              style={{
                color: Colors.white,
                fontSize: 16,
                fontFamily: "outfit-medium",
              }}
            >
              Add
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  itemImage: {
    width: 150,
    height: 150,
    backgroundColor: Colors.grey,
    borderRadius: 15,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: Colors.grey,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    width: "100%",
  },
  addButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 99,
    marginTop: 30,
    alignItems: "center",
  },
});
