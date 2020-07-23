import { Platform, AsyncStorage } from "react-native";
import * as Google from "expo-google-app-auth";
import axios from "axios";
import PolyLine from "@mapbox/polyline";

export const prefix = Platform.OS === "ios" ? "ios" : "md";

const config = {
  iosClientId: `*****************************`,
  androidClientId: `***************************`,
  iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
  androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`
};

export const whiteMapStyle = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#e3e3e3"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "all",
    stylers: [
      {
        lightness: "100"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: "0"
      },
      {
        lightness: "6"
      },
      {
        weight: "0.90"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      },
      {
        lightness: "0"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "geometry",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "poi.attraction",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.government",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "poi.government",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.government",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.medical",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#d7f0d7"
      },
      {
        lightness: "-6"
      }
    ]
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.school",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.sports_complex",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        color: "#cccccc"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: "0"
      },
      {
        lightness: "30"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on"
      },
      {
        lightness: "-100"
      },
      {
        gamma: "0.00"
      },
      {
        weight: "0.01"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "all",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "transit.station.airport",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit.station.airport",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#FFFFFF"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#f2f8fd"
      },
      {
        lightness: "-19"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

export const API_KEY = "*******************";

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

export const SERVER_URL = "http://192.168.43.108:4000";

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
