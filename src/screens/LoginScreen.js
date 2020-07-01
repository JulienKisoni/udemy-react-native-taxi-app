import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import Block from "../components/Block";
import Title from "../components/Title";
import LoginBtn from "../components/LoginBtn";
import { prefix, auth } from "../utils/helpers";

const { width } = Dimensions.get("window");

const LoginScreen = props => {
  const { container, icon, container_2, titleContainer } = styles;
  const handleLogin = () => {
    auth();
  };
  return (
    <View style={container}>
      <Block>
        <Ionicons name={`${prefix}-car`} style={icon} />
        <Title content="TAXI APP" size="big" />
      </Block>
      <View style={container_2}>
        <View style={titleContainer}>
          <Title content="Authentification" size="small" />
          <Title content="Google Connexion" size="medium" />
        </View>
        <LoginBtn onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  icon: {
    fontSize: 80,
    color: "#fff"
  },
  container_2: {
    flexGrow: 1,
    width,
    justifyContent: "space-around",
    alignItems: "center"
  },
  titleContainer: {
    width: width - 80,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});

export default LoginScreen;
