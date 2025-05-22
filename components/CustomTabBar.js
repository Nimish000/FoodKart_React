import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import SvgSelector from "../Utils/SvgSelector";
import { Colorss } from "../Colors/Colors";

export const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "#1A1A1A",
        flexDirection: "row",
        padding: 15,
        borderRadius: 15,
        alignSelf: "center",
        position: "absolute",
        zIndex: 3,
        bottom: 8, // Adjust the bottom value as needed
        width: "94%",
        alignItems: "center",
        paddingHorizontal: 20,
        flex: 1,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        let name;
        if (label == "HomeHandler") {
          name = "Home";
        } else if (label == "SearchHandler") {
          name = "Search";
        } else if (label == "CartHandler") {
          name = "Cart";
        } else if (label == "AccountHandler") {
          name = "Account";
        }

        // Add your custom styling and components here

        return (
          <TouchableOpacity
            style={{
              backgroundColor: isFocused ? Colorss.greenLight : "transparent",
              padding: 9,
              flexDirection: "row",
              flex: 1,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate(route.name)}
            key={index}
          >
            <SvgSelector
              name={label}
              h={20}
              w={20}
              fill={isFocused ? Colorss.green : Colorss.greenLightTab}
              key={index}
            />
            {isFocused && (
              <Text
                style={{
                  color: isFocused ? "green" : "white",
                  marginHorizontal: 5,
                }}
              >
                {name}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
