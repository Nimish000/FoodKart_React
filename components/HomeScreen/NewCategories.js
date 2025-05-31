import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import RoundListData from "./RoundListData";
import {} from'../../assets/drawables/1.jpg'
import { EndPoints } from "../../Utils/Service/Endpoint";
import { Service } from "../../Utils/Service/Service";
import { Colorss } from "../../Colors/Colors";
import { AppUtil, dynamicFontSize } from "../../Utils/AppUtils";

const Data = [
  { id: 1, image: require('../../assets/drawables/1.jpg'), name: "Pancake" },
  { id: 2, image: require('../../assets/drawables/pasta.jpg'), name: "Pasta" },
  { id: 3, image: require('../../assets/drawables/rajkachori.jpg'), name: "Raj Kachori" },
  { id: 4, image: require('../../assets/drawables/samosa.jpg'), name: "Samosa" },
  { id: 5, image: require('../../assets/drawables/shahi.jpg'), name: "Paneer" },
  { id: 6, image: require('../../assets/drawables/vadapao.jpg'), name: "VadaPao" },
  { id: 7, image: require('../../assets/drawables/dosa.jpeg'), name: "Dosa" },
  { id: 8, image: require('../../assets/drawables/chilipotato.jpg'), name: "Chili Potato" },
  { id: 9, image: require('../../assets/drawables/jalebi.jpg'), name: "Jalebi" },
  { id: 10, image:require('../../assets/drawables/panipuri.webp'), name: "Panipuri" },
];

export default function NewCategories({category}) {
  useEffect(()=>{
getCategoriesList()
  },[])
  const [categories, setCategories] = useState([]);

  const getCategoriesList = () => {

    var endPoint = EndPoints.categories ;
    Service.getUsingToken(endPoint, (res) => {
        // console.log("data----->",res)
        setCategories(res?.categories)

    },
        (err) => {
        }
    );
};
  function renderItemHandler(itemData) {
    return <RoundListData {...itemData.item} />;
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
              USER, WHAT'S ON YOUR MIND?
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
    data={categories}
    renderItem={renderItemHandler}
    keyExtractor={(item) => item.id}
    horizontal={true} // Set to true for horizontal layout
     // Set the number of columns (change as needed)
    //  numColumns={4}
    
     scrollEnabled={true}
  />
  </View>
  );
}
