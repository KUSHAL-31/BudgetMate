import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import PieChart from "react-native-pie-chart";
import Colors from "../utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CircleChart({ categoryList }) {
  const widthAndHeight = 100;
  const [series, setSeries] = useState([1]);
  const [sliceColors, setSliceColors] = useState([Colors.grey]);
  const [totalEstimate, setTotalEstimate] = useState(0);

  // This useEffect hook is used to load the pie chart
  useEffect(() => {
    loadPieChart();
  }, [categoryList]);

  // FUnction to render pie chart
  const loadPieChart = () => {
    let total = 0;
    setSeries([1]);
    setSliceColors([Colors.grey]);
    let otherCost = 0;
    categoryList.forEach((item, index) => {
      if (index < 4) {
        var itemTotalCost = 0;
        item?.BudgetCategoryItems?.forEach((_item) => {
          itemTotalCost += _item.cost;
          total += _item.cost;
        });
        setSliceColors((sliceColor) => [
          ...sliceColor,
          Colors.COLOR_LIST[index],
        ]);
        setSeries((series) => [...series, itemTotalCost]);
      } else {
        item?.BudgetCategoryItems?.forEach((_item) => {
          otherCost += _item.cost;
          total += _item.cost;
        });
      }
    });
    setTotalEstimate(total);
    setSliceColors((sliceColor) => [...sliceColor, Colors.COLOR_LIST[4]]);
    setSeries((series) => [...series, otherCost]);
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontFamily: "outfit-regular" }}>
        Total Estimate :{" "}
        <Text style={{ fontFamily: "outfit-bold" }}>Rs {totalEstimate}</Text>{" "}
      </Text>
      <View style={styles.rightSection}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColors}
          coverRadius={0.65}
          coverFill={"#FFF"}
        />
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          {categoryList.length === 0 ? (
            <View>
              <MaterialCommunityIcons
                name="checkbox-blank-circle"
                size={24}
                color={Colors.grey}
              ></MaterialCommunityIcons>
              <Text style={{ fontFamily: "outfit-regular" }}>NA</Text>
            </View>
          ) : (
            <View>
              {categoryList.map(
                (item, index) =>
                  index <= 4 && (
                    <View key={index} style={styles.categoryContainer}>
                      <MaterialCommunityIcons
                        name="checkbox-blank-circle"
                        size={24}
                        color={Colors.COLOR_LIST[index]}
                      ></MaterialCommunityIcons>
                      <Text style={{ fontFamily: "outfit-medium" }}>
                        {index < 4 ? item.name : "Others"}
                      </Text>
                    </View>
                  )
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 15,
    elevation: 1,
  },
  rightSection: {
    flexDirection: "row",
    gap: 40,
    marginTop: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
