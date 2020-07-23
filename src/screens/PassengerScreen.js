import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image
} from "react-native";
import Constants from "expo-constants";
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import SocketIO from "socket.io-client";

import PlaceInput from "../components/PlaceInput";
import {
  BASE_URL,
  API_KEY,
  getRoute,
  decodePoint,
  SERVER_URL,
  whiteMapStyle
} from "../utils/helpers";
import TAXI_LOGO from "../../assets/images/taxi.png";

let io;
const initialState = {
  latitude: null,
  longitude: null,
  coordinates: [],
  destinationCoords: null,
  taxiCoords: null
};
const { width, height } = Dimensions.get("window");
const PassengerScreen = props => {
  const mapView = useRef();
  const [state, setState] = useState(initialState);
  const {
    latitude,
    longitude,
    coordinates,
    destinationCoords,
    taxiCoords
  } = state;
  const { container, mapStyle, taxiStyle } = styles;
  useEffect(() => {
    if (taxiCoords) {
      mapView.current.fitToCoordinates([...coordinates, taxiCoords], {
        animated: true,
        edgePadding: {
          top: 100,
          bottom: 40,
          left: 40,
          right: 40
        }
      });
    }
  }, [taxiCoords]);
  useEffect(() => {
    return () => io.emit("quit", "pass");
  }, []);
  const connectSocket = () => {
    io = SocketIO.connect(SERVER_URL);
    io.on("connect", () => {
      console.log("connexion passager réussie");
    });
    io.on("requestPassenger", taxiInfo => {
      // alerte pour dire qu'un taxi est en route
      Alert.alert("Taxi En Route");
      setState(prevState => ({
        ...prevState,
        taxiCoords: {
          latitude: taxiInfo.lat,
          longitude: taxiInfo.long
        }
      }));
    });
  };
  const handlePredictionPress = async place_id => {
    try {
      const url = `${BASE_URL}/directions/json?key=${API_KEY}&destination=place_id:${place_id}&origin=${latitude},${longitude}`;
      // console.log("url", url);
      const points = await getRoute(url);
      const coordinates = decodePoint(points);
      setState(prevState => ({
        ...prevState,
        coordinates,
        destinationCoords: coordinates[coordinates.length - 1]
      }));
      mapView.current.fitToCoordinates(coordinates, {
        animated: true,
        edgePadding: {
          top: 100,
          bottom: 40,
          left: 40,
          right: 40
        }
      });
      io.emit("requestTaxi", { latitude, longitude });
    } catch (e) {
      console.error("error prediction press", e);
    }
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
      connectSocket();
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={whiteMapStyle}
          ref={mapView}
          style={mapStyle}
          showsUserLocation
          followsUserLocation
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.121
          }}
        >
          {coordinates.length > 0 && (
            <Polyline
              coordinates={coordinates}
              strokeWidth={6}
              strokeColor="#2dbb54"
            />
          )}
          {destinationCoords && <Marker coordinate={destinationCoords} />}
          {taxiCoords && (
            <Marker coordinate={taxiCoords}>
              <Image source={TAXI_LOGO} style={taxiStyle} />
            </Marker>
          )}
        </MapView>
        <PlaceInput
          latitude={latitude}
          longitude={longitude}
          onPredictionPress={handlePredictionPress}
        />
      </View>
    </TouchableWithoutFeedback>
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
  taxiStyle: {
    width: 30,
    height: 30
  }
});

export default PassengerScreen;
