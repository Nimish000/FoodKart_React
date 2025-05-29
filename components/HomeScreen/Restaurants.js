import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colorss } from "../../Colors/Colors";
import { AppUtil, dynamicFontSize } from "../../Utils/AppUtils";
import RestaurantItem from "./RestaurantItem";
import { EndPoints } from "../../Utils/Service/Endpoint";
import { Service } from "../../Utils/Service/Service";



export default function Restaurants() {
  useEffect(()=>{
      getCategoriesList()
        },[])
        const [items, setItems] = useState([]);
      
        const getCategoriesList = () => {
      
          var endPoint = EndPoints.getRestaurants ;
          Service.getUsingToken(endPoint, (res) => {
              console.log("item data----->",res)
              setItems(res?.list)
              console.log("get item",list[0])
      
          },
              (err) => {
              }
          );
      };
  function renderRestaurants({ item }) {
    return <RestaurantItem {...item} />;
  }

  return (
    <View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text
          style={{
            flex: 0,
            color: Colorss.white,
            fontSize: dynamicFontSize*0.9,
            fontWeight: 500,
            margin: AppUtil.getWP(2),
          }}
        >
          TOP RATED NEAR YOU
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: Colorss.grey,
            flex: 1,
            alignSelf: "center",
            marginEnd: AppUtil.getWP(2),
          }}
        />
      </View>
      <FlatList
        renderItem={renderRestaurants}
        keyExtractor={(item) => item.id}
        data={items}
        horizontal={true}
        scrollEnabled={true}
       
      />
    </View>
  );
}
