import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { renderInitialScreen } from "./src/utils/helpers";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialScreen, setinItialScreen] = useState("Login");
  const loadRessources = async () => {
    try {
      await Font.loadAsync({
        Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
        LeckerliOne: require("./assets/fonts/LeckerliOne-Regular.ttf")
      });
      const screen = await renderInitialScreen();
      if (screen) setinItialScreen(screen);
      setLoading(false);
    } catch (e) {
      console.error("error loading ressources", e);
    }
  };
  useEffect(() => {
    loadRessources();
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={initialScreen}
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Login" component={LoginScreen} />
        <Screen name="Home" component={HomeScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
