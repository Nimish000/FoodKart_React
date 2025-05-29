import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { _baseURL, AppUtil, dynamicFontSize } from "../../Utils/AppUtils";
import { Colorss } from "../../Colors/Colors";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantItem({
  _id,
  url,
  name,
  price,
  description,
  rating,
  time,
}) {
  const navigation = useNavigation();
  const img = `${_baseURL}${url}`;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RestaurantScreen", {
          name: name,
          description,
          rating,
          restaurantId:_id,
        })
      }
      style={{
        width: AppUtil.getWP(35),

        marginStart: AppUtil.getWP(4),
        marginBottom: AppUtil.getHP(2),
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: img }}
        style={{
          width: "100%",
          height: AppUtil.getHP(17),
          borderRadius: AppUtil.getWP(3),
        }}
      />

      {/* <Image source={{uri:`${url}`}} style={{width: "100%",height: w(17),borderRadius:w(7)}}/> */}
      <Text
        numberOfLines={2}
        style={{
          color: "white",
          alignSelf: "start",
          fontSize: dynamicFontSize,
          fontWeight: 600,
          marginTop: AppUtil.getHP(0.5),
        }}
      >
        {name}
      </Text>

      <Text
        numberOfLines={1}
        style={{
          color: "white",
          alignSelf: "start",
          fontSize: dynamicFontSize * 0.8,
          fontWeight: 300,
          marginTop: AppUtil.getHP(0.5),
        }}
      >
        ⭐{rating} {time} min
        {/* {restaurant} */}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          color: Colorss.white,
          alignSelf: "start",
          fontSize: dynamicFontSize * 0.7,
          fontWeight: 100,
          marginTop: AppUtil.getHP(0.5),
        }}
      >
        {description}
        {/* {restaurant} */}
      </Text>
    </TouchableOpacity>
  );
}
