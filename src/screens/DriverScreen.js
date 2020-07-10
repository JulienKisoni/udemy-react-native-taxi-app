import React, { useState, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  Linking
} from "react-native";
import Constants from "expo-constants";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import SocketIO from "socket.io-client";
import { SERVER_URL } from "../utils/helpers";

let io;
const initialState = {
  latitude: null,
  longitude: null,
  coordinates: [],
  destinationCoords: null
};
const { width, height } = Dimensions.get("window");
const DriverScreen = props => {
  const [state, setState] = useState(initialState);
  const { latitude, longitude, coordinates, destinationCoords } = state;
  const { container, mapStyle } = styles;
  const openMaps = (latitude, longitude) => {
    const androidUrl = `geo:0,0?q=${latitude},${longitude}(destination)`;
    const iosUrl = `http://maps.apple.com?addr=${latitude},${longitude}`;
    const url = Platform.OS === "ios" ? iosUrl : androidUrl;
    Linking.openURL(url);
  };
  const searchPassenger = ({ lat, long }) => {
    io = SocketIO.connect(SERVER_URL);
    io.on("connect", () => {
      console.log("connexion taxi réussie");
      io.emit("requestPassenger", { lat, long });
      io.on("requestTaxi", passInfo => {
        setState(prevState => ({
          ...prevState,
          destinationCoords: {
            latitude: passInfo.latitude,
            longitude: passInfo.longitude
          }
        }));
        // afficher une alert pour savoir si il est OK
        Alert.alert(
          "Passager Trouvé !",
          "Acceptez-vous la course ?",
          [
            {
              text: "Refuser",
              onPress: () => {}
            },
            {
              text: "Accepter",
              onPress: () => {
                io.emit("requestPassenger", { lat, long });
                //    ouvrir google map
                openMaps(passInfo.lat, passInfo.long);
              }
            }
          ],
          {
            cancelable: false
          }
        );
        // si il est ok, on passe aux étapes 6 et 7.
      });
    });
  };
  const getUserLocation = async () => {
    try {
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      // console.log("location", location);
      setState(prevState => ({
        ...prevState,
        latitude,
        longitude
      }));
      searchPassenger({ latitude, longitude });
    } catch (e) {
      console.error("error getUserLocation", e);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);
  if (!latitude || !longitude) {
    return (
      <View style={container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={container}>
      <MapView
        style={mapStyle}
        showsUserLocation
        followsUserLocation
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.121
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  mapStyle: {
    width,
    height
  }
});

export default DriverScreen;
