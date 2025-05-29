import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colorss } from "../../Colors/Colors";
import { _baseURL, AppUtil, dynamicFontSize } from "../../Utils/AppUtils";

export default function RestaurantDishesItem({
  name,
      price,
      description,
      rating,
      qty,
      isVeg,
  url,
  onPress,
  onRemove
}) {
  const [Nqty, setQty] = useState(qty);
  
  const img=`${_baseURL}${url.replace(/\\/g, '/')}`
  return (
    <View
      style={{
        backgroundColor: Colorss.black,
        flex: 1,
        margin: AppUtil.getHP(1.3),
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.5 ,marginTop:AppUtil.getHP(1)}}>
          {!!isVeg && (
            <Image
              source={require("../../assets/drawables/veg.png")}
              style={{ height: AppUtil.getHP(2), width: AppUtil.getHP(2) }}
            />
          )}
          {!isVeg && (
            <Image
              source={require("../../assets/drawables/nonveg.png")}
              style={{ height: AppUtil.getHP(2), width: AppUtil.getHP(2) }}
            />
          )}

          <Text
            style={{
              color: Colorss.white,
              marginTop: AppUtil.getHP(0.8),
              fontSize: dynamicFontSize * 1.1,
              fontWeight: 800,
            }}
            numberOfLines={1}
          >
            {name}
          </Text>

          <Text
            style={{
              color: Colorss.white,
              marginTop: AppUtil.getHP(0.6),
              fontSize: dynamicFontSize * 0.9,
              fontWeight: 700,
            }}
            numberOfLines={1}
          >
            ₹ {price}
          </Text>

          <Text
            style={{
              color: Colorss.white,
              marginTop: AppUtil.getHP(0.8),
              fontSize: dynamicFontSize * 0.7,
              fontWeight: 700,
            }}
            numberOfLines={1}
          >
            ★ {rating}
          </Text>

          <Text
            style={{
              color: Colorss.white,
              marginTop: AppUtil.getHP(1),
              fontSize: dynamicFontSize * 0.6,
              fontWeight: 600,
            }}
            numberOfLines={2}
          >
            {description}
          </Text>
        </View>

        <View style={{ flex: 0.5, position: "relative" }}>
          <Image
            source={{ uri: img }}
            style={{
              height: AppUtil.getHP(16),
              width: "100%",
              padding: AppUtil.getHP(1.5),
              resizeMode: "stretch",
              borderRadius: AppUtil.getWP(2),
            }}
          />
          {!!qty && (
            <View
              style={{
                width: AppUtil.getWP(28),
                backgroundColor: Colorss.red,
                height: AppUtil.getHP(4),
                borderRadius: AppUtil.getWP(1),
                position: "absolute",
                bottom: AppUtil.getHP(0.2),
                start: AppUtil.getWP(9),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,

                  justifyContent: "center",
                  height: AppUtil.getHP(4),
                }}
                onPress={onRemove}
              >
                <Text
                  style={{
                    color: Colorss.white,
                    fontSize: dynamicFontSize * 1.2,
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  color: Colorss.white,
                  fontSize: dynamicFontSize * 1.2,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                {qty}
              </Text>

              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  height: AppUtil.getHP(4),
                }}
                onPress={onPress}
              >
                <Text
                  style={{
                    color: Colorss.white,
                    fontSize: dynamicFontSize * 1.2,
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {!qty && (
            <TouchableOpacity
              onPress={onPress}
              style={{
                width: AppUtil.getWP(28),
                backgroundColor: Colorss.red,
                padding: AppUtil.getWP(2),
                borderRadius: AppUtil.getWP(1),
                position: "absolute",
                bottom: AppUtil.getHP(0.2),
                start: AppUtil.getWP(9),
              }}
            >
              <Text
                style={{
                  color: Colorss.white,
                  fontSize: dynamicFontSize,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                ADD
              </Text>
            </TouchableOpacity>
          )}
        </View>

      </View>

      <View style={{backgroundColor:Colorss.grey, height:1,marginTop:AppUtil.getHP(2)}}/>
    </View>
  );
}
