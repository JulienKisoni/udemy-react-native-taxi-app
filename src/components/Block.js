import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const Block = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: (width * 4) / 3,
    backgroundColor: "#2dbb54",
    flexGrow: 3,
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Block;
