import { View, Text, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { _baseURL, AppUtil, dynamicFontSize } from "../../Utils/AppUtils";
import { Colorss } from "../../Colors/Colors";
import { useNavigation } from "@react-navigation/native";

export default function SearchRestaurantItem({
  id,
  restaurantId,
  img,
  name,
  onClose,
  description,
}) {
  // const img = `${_baseURL}${url.replace(/\\/g, "/")}`;
  const navigation = useNavigation();

  

  return (<TouchableWithoutFeedback onPress={()=>navigation.navigate('RestaurantScreen',{name,description}) }>

    <View style={{flex:1, flexDirection: "row", margin: AppUtil.getWP(5) }}>
      <Image
        source={{uri:img}}
        style={{
          flex:0.6,
          height: AppUtil.getHP(18),
          width: AppUtil.getWP(40),
          borderRadius: AppUtil.getWP(3),
        }}
      />
      <View style={{flex:0.6,justifyContent:'center',marginStart:AppUtil.getWP(5),marginEnd:AppUtil.getWP(0)}}>
        <Text
          numberOfLines={2}
          style={{
            color: "white",
            alignSelf: "start",
            fontSize: dynamicFontSize*1.2,
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
          ⭐4.5 40-45 min
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
      </View>

    </View>
    </TouchableWithoutFeedback>
  );
}
