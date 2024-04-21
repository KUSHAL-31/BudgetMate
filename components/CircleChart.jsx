import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import PieChart from "react-native-pie-chart";
import Colors from "../utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CircleChart() {
  const widthAndHeight = 150;
  const [series, setSeries] = useState([1]);
  const [sliceColors, setSliceColors] = useState([Colors.grey]);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontFamily: "outfit-regular" }}>
        Total Estimate : <Text style={{ fontFamily: "outfit-bold" }}>Rs 0</Text>{" "}
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
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={24}
            color={Colors.grey}
          ></MaterialCommunityIcons>
          <Text style={{ fontFamily: "outfit-regular" }}>NA</Text>
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
});
