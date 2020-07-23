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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import SocketIO from "socket.io-client";
import { SERVER_URL, whiteMapStyle } from "../utils/helpers";

let io;
const initialState = {
  latitude: null,
  longitude: null,
  coordinates: [],
  destinationCoords: null,
  taxiOk: false
};
const { width, height } = Dimensions.get("window");
const DriverScreen = props => {
  const [state, setState] = useState(initialState);
  const { latitude, longitude, taxiOk, destinationCoords } = state;
  const { container, mapStyle, mySpinner } = styles;
  const openMaps = (latitude, longitude) => {
    setState(prevState => ({
      ...prevState,
      taxiOk: true
    }));
    const androidUrl = `geo:0,0?q=${latitude},${longitude}(destination)`;
    const iosUrl = `http://maps.apple.com?addr=${latitude},${longitude}`;
    const url = Platform.OS === "ios" ? iosUrl : androidUrl;
    Linking.openURL(url);
  };
  useEffect(() => {
    return () => io.emit("quit", "taxi");
  }, []);
  useEffect(() => {
    if (taxiOk) {
      io.emit("requestPassenger", { lat: latitude, long: longitude });
    }
  }, [taxiOk]);
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
                //    ouvrir google map
                openMaps(passInfo.latitude, passInfo.longitude);
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
        provider={PROVIDER_GOOGLE}
        customMapStyle={whiteMapStyle}
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
      {!destinationCoords && (
        <View style={mySpinner}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
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
  },
  mySpinner: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "#2dbb54",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30
  }
});

export default DriverScreen;
