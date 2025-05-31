import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ViewBase,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AppUtil, dynamicFontSize } from "../Utils/AppUtils";
import { Colorss } from "../Colors/Colors";
import SvgSelector from "../Utils/SvgSelector";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RestaurantsDishes from "../components/RestaurantScreen/RestaurantsDishes";

export default function RestaurantScreen({ route }) {
  const navigation = useNavigation();
  const { name, description,rating,restaurantId } = route.params;
   const [searchText, setSearchText] = useState(""); // ✅ search state
  return (
    <View style={{ backgroundColor: Colorss.black, flex: 1 }}>
      <View
        style={{
          paddingTop: AppUtil.getHP(4),
          backgroundColor: Colorss.lightGrey,
          borderBottomStartRadius: AppUtil.getWP(5),
          borderBottomEndRadius: AppUtil.getWP(5),
          paddingBottom: AppUtil.getHP(2),
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../assets/drawables/back.png")}
            style={{
              height: AppUtil.getHP(2),
              width: AppUtil.getWP(6),
              resizeMode: "cover",
              marginTop: AppUtil.getHP(3),
              marginStart: AppUtil.getWP(4),
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={{
            marginTop: AppUtil.getHP(3),
            backgroundColor: Colorss.black,
            borderRadius: AppUtil.getWP(3),
            marginHorizontal: AppUtil.getWP(5),
            padding: AppUtil.getWP(5),
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                color: Colorss.white,
                fontSize: dynamicFontSize * 1.1,
                fontWeight: 800,
              }}
            >
              {name}
            </Text>

            <View
              style={{
                backgroundColor: Colorss.greenLightTab,
                padding: AppUtil.getWP(1),
                borderRadius: AppUtil.getWP(1),
                marginEnd: AppUtil.getWP(1),
              }}
            >
              <Text style={{ color: Colorss.white, fontWeight: 600 }}>
                ★ {rating}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: AppUtil.getHP(0.2),
            }}
          >
            <Text
              style={{
                color: Colorss.white,
                fontSize: dynamicFontSize * 0.9,
                fontWeight: 400,
              }}
            >
              ⟟ Raj Nagar extension
            </Text>
            <Text
              style={{
                color: Colorss.white,
                fontWeight: 200,
                fontSize: dynamicFontSize * 0.8,
                marginEnd: AppUtil.getWP(1),
              }}
            >
              661 ratings
            </Text>
          </View>
        </View>
        {/* <View style={{ height: 1, backgroundColor: Colorss.grey }}></View> */}
      </View>
    <KeyboardAwareScrollView>
      <View
        style={{
          backgroundColor: Colorss.white,
          borderRadius: AppUtil.getWP(5),
          marginTop: AppUtil.getHP(2),
          padding: AppUtil.getWP(2),
          flexDirection:'row'
        }}
      >
        <Ionicons name="search" size={24} color="#757575" style={{}} />

        <TextInput
          placeholder="Search for dishes"
          placeholderTextColor="#757575"
           onChangeText={(text) => setSearchText(text)} // ✅ update search text
           value={searchText}
          style={{
            
            color: Colorss.black,
            marginHorizontal: AppUtil.getWP(4), // Adjust as needed
            // Adjust as needed
            fontSize: dynamicFontSize,
          }}
        />
      </View>
       <RestaurantsDishes restaurantId={restaurantId}  searchText={searchText}/>
        </KeyboardAwareScrollView>
         <TouchableOpacity
        style={{
          position: "absolute",
          bottom: AppUtil.getHP(3),
          alignSelf: "center",
          backgroundColor: Colorss.red,
          paddingVertical: AppUtil.getHP(1.2),
          paddingHorizontal: AppUtil.getWP(5),
          borderRadius: AppUtil.getWP(10),
          elevation: 5,
          zIndex: 10,
          flexDirection:'row',
          

        }}
        onPress={() => navigation.navigate("CartHandler")} // 👈 Update with actual screen name
      >
        <SvgSelector fill={'white'} name={'CartHandler'} h={20} w={20}/>
        <Text style={{ marginStart:AppUtil.getWP(2),color: Colorss.white, fontWeight: "bold", fontSize: dynamicFontSize }}>
          Go to Cart
        </Text>
      </TouchableOpacity>
       

    </View>
  );
}
