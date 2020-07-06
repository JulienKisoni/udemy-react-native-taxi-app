import React from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { prefix } from "../utils/helpers";
const { width } = Dimensions.get("window");

const PlaceInput = props => {
  const { container, icon, input, inputContainer } = styles;
  return (
    <View style={container}>
      <View style={inputContainer}>
        <TextInput style={input} />
        <Ionicons style={icon} name={`${prefix}-search`} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: width - 50,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  icon: {
    fontSize: 25,
    color: "#d6d6d6"
  },
  input: {
    fontSize: 16,
    color: "#303030",
    maxWidth: "70%",
    minWidth: "30%",
    fontFamily: "Poppins"
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  }
});

export default PlaceInput;
