import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import Colors from "../utils/Colors";
import ColorPicker from "../components/ColorPicker";

export default function AddNewCategory() {
  const [selectedIcon, setSelectedIcon] = useState("Ic");
  const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY);

  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={[styles.categoryInput, { backgroundColor: selectedColor }]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  categoryInput: {
    textAlign: "center",
    fontSize: 30,
    padding: 20,
    borderRadius: 100,
    paddingHorizontal: 28,
    color: Colors.white,
  },
});
