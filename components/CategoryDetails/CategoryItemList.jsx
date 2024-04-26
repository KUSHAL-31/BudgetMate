import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Linking,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../utils/Colors";
import { EvilIcons } from "@expo/vector-icons";
import { supabase } from "../../utils/SupabaseConfig";
import { openURL } from "expo-linking";

export default function CategoryItemList({ categoryDetails, setUpdateRecord }) {
  const [expandItem, setExpandItem] = useState(-1);

  // Function to delete item from category
  const onDeleteItem = async (itemId) => {
    try {
      const { data, error } = await supabase
        .from("BudgetCategoryItems")
        .select("image")
        .eq("id", itemId);
      if (data) {
        if (data[0].image.includes("/public/images/")) {
          const imagePath = data[0].image.split("/public/images/")[1];
          await supabase.storage.from("images").remove([imagePath]);
        }
      }
      await supabase.from("BudgetCategoryItems").delete().eq("id", itemId);
      ToastAndroid.show("Item deleted successfully", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      setUpdateRecord();
    }
  };

  // Function to open the URL in the browser

  const openUrl = (url) => {
    try {
      Linking.openURL(url);
    } catch (error) {
      ToastAndroid.show("Invalid URL", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Category Items</Text>
      {/* List of category items */}
      <View style={styles.itemListContainer}>
        {categoryDetails?.BudgetCategoryItems?.length > 0 ? (
          categoryDetails?.BudgetCategoryItems?.map((item, index) => (
            <>
              <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                style={styles.itemContainer}
                onPress={() => setExpandItem(index)}
              >
                <Image source={{ uri: item?.image }} style={styles.itemImage} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.itemName}>{item?.name}</Text>
                  <Text style={styles.itemUrl}>{item?.url}</Text>
                </View>
                <Text style={styles.itemCost}>Rs {item?.cost}</Text>
              </TouchableOpacity>
              {expandItem === index && (
                <View style={styles.actionContainer}>
                  <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                    <EvilIcons name="trash" size={27} color={Colors.red} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => item?.url && openUrl(item?.url)}
                  >
                    <EvilIcons
                      name="external-link"
                      size={27}
                      color={Colors.blue}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {categoryDetails?.BudgetCategoryItems.length - 1 !== index && (
                <View
                  key={index}
                  style={{
                    width: "100%",
                    borderWidth: 0.5,
                    borderColor: Colors.grey,
                  }}
                ></View>
              )}
            </>
          ))
        ) : (
          <Text
            style={{
              color: Colors.grey,
              fontSize: 17,
              fontFamily: "outfit-medium",
            }}
          >
            No items found
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  itemImage: {
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  itemListContainer: {
    marginTop: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  itemName: {
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
  itemUrl: {
    fontFamily: "outfit-regular",
    color: Colors.grey,
  },
  itemCost: {
    fontFamily: "outfit-bold",
    marginLeft: 10,
    fontSize: 18,
  },
  actionContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    marginBottom: 15,
  },
});
