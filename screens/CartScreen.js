import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colorss } from "../Colors/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { AppUtil, dynamicFontSize } from "../Utils/AppUtils";
import CartItem from "../components/CartScreen/CartItem";
import Cart from "../components/CartScreen/Cart";

export default function CartScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colorss.black,
        paddingTop: AppUtil.getHP(6),
        padding: AppUtil.getHP(1),
      }}
    >
      <Text
        style={{
          fontSize: dynamicFontSize * 1.2,
          color: Colorss.white,
          margin: AppUtil.getWP(2),
        }}
      >
        My Cart
      </Text>
      <View
        style={{
          height: 1,
          backgroundColor: Colorss.grey,
          marginBottom: AppUtil.getWP(2),
        }}
      />
      <ScrollView style={{ marginBottom: AppUtil.getHP(8) }}>
        <Cart />

        {/* After cart items */}
        <TouchableOpacity
          // onPress={() => setEditable(false)}
          style={{
            backgroundColor: Colorss.green,
            padding: AppUtil.getWP(2),
            borderRadius: AppUtil.getWP(5),
            margin: AppUtil.getHP(3),
          }}
        >
          <Text style={{fontSize: dynamicFontSize * 1.2,
    textAlign: "center",}}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
