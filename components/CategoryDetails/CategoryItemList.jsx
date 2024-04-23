import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../../utils/Colors";

export default function CategoryItemList({ categoryDetails }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Category Items</Text>
      {/* List of category items */}
      <View style={styles.itemListContainer}>
        {categoryDetails?.BudgetCategoryItems?.length > 0 ? (
          categoryDetails?.BudgetCategoryItems?.map((item, index) => (
            <>
              <View key={index} style={styles.itemContainer}>
                <Image source={{ uri: item?.image }} style={styles.itemImage} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.itemName}>{item?.name}</Text>
                  <Text style={styles.itemUrl}>{item?.url}</Text>
                </View>
                <Text style={styles.itemCost}>Rs {item?.cost}</Text>
              </View>
              {categoryDetails?.BudgetCategoryItems.length - 1 !== index && (
                <View
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
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  itemListContainer: {
    marginTop: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
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
});
