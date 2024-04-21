import { View, Text } from "react-native";
import React from "react";
import PieChart from "react-native-pie-chart";

export default function CircleChart() {
  const widthAndHeight = 150;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ["#F44336", "#2196F3", "#FFEB3B", "#4CAF50", "#FF9800"];
  return (
    <View>
      <Text>CircleChart</Text>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.45}
        coverFill={"#FFF"}
      />
    </View>
  );
}
