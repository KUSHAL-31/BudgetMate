import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../utils/Colors";

export default function ColorPicker({ selectedColor, setSelectedColor }) {
  return (
    <View style={{ flexDirection: "row", gap: 20, marginTop: 10 }}>
      {Colors.COLOR_LIST.map((color, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              {
                backgroundColor: color,
                height: 30,
                width: 30,
                borderRadius: 100,
              },
              selectedColor === color && {
                borderWidth: 4,
              },
            ]}
            onPress={() => setSelectedColor(color)}
          ></TouchableOpacity>
        );
      })}
    </View>
  );
}
