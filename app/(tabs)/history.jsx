import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Colors from "../../utils/Colors";

export default function History() {
  return (
    <View style={{ marginTop: 20, flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headingText}>BudgetMate History</Text>
      </View>
      <View style={styles.historyContainer}>
        <Text style={styles.contentHeaderText}>Coming </Text>
        <Text style={styles.contentHeaderText}>Soon! </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    alignItems: "center",
  },
  headingText: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  historyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentHeaderText: {
    fontSize: 44,
    fontFamily: "outfit-bold",
    color: Colors.grey,
  },
});
