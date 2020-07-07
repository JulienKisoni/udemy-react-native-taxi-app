import { Platform, AsyncStorage } from "react-native";
import * as Google from "expo-google-app-auth";
import axios from "axios";
import PolyLine from "@mapbox/polyline";

export const prefix = Platform.OS === "ios" ? "ios" : "md";

const config = {
  iosClientId: `338731194861-e7hl0ccu1rtmi28ua3met4ev842pu415.apps.googleusercontent.com`,
  androidClientId: `338731194861-1qf86jgd4jcfnim9e0qbhv51408vpk6b.apps.googleusercontent.com`,
  iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
  androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`
};

export const API_KEY = "AIzaSyDBHoVbqCTbIQ-YPj4fPxes2f-HhD9SRS4";

export const BASE_URL = "https://maps.googleapis.com/maps/api";

export const auth = async () => {
  try {
    const { user, type } = await Google.logInAsync(config);
    // console.log("result", result);
    if (type === "success") {
      // stocker l'utilisateur dans la BDD
      //  stocker l'utilisateur dans la memoire interne
      const { name, photoUrl, email } = user;
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          name,
          photoUrl,
          email
        })
      );
      //  naviguer vers l'ecran Home
      console.log("naviguer vers home");
    }
  } catch (e) {
    console.error("error auth", e);
  }
};

export const renderInitialScreen = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    JSON.parse(user);
    return user ? "Home" : "Login";
  } catch (e) {
    console.error("error render initial screen", e);
  }
};

export const getRoute = async url => {
  try {
    const {
      data: { routes }
    } = await axios.get(url);
    const points = routes[0].overview_polyline.points;
    return points;
  } catch (e) {
    console.error("error route", e);
  }
};

export const decodePoint = point => {
  const fixPoints = PolyLine.decode(point);
  const route = fixPoints.map(fixPoint => {
    return {
      latitude: fixPoint[0],
      longitude: fixPoint[1]
    };
  });
  console.log("route", route);
  return route;
};
