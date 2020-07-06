import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RoundBtn = ({ iconName, onPress }) => {
  const { container, iconStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={container}>
        <Ionicons style={iconStyle} name={iconName} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2dbb54",
    height: 80,
    width: 80,
    borderRadius: 40
  },
  iconStyle: {
    fontSize: 45,
    color: "#fff"
  }
});

export default RoundBtn;
