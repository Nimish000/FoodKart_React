import { View, Text, Modal, TextInput, Image, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colorss } from "../../Colors/Colors";
import { AppUtil, dynamicFontSize } from "../../Utils/AppUtils";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import SearchRestaurantItem from "./SearchRestaurantItem";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation, useRoute } from "@react-navigation/native";
import { EndPoints } from "../../Utils/Service/Endpoint";
import { Service } from "../../Utils/Service/Service";

const Data = [
  {
    id: 1,
    restaurantId: 'r001',
    name: 'The Spice Villa',
    img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092', // Working Unsplash image
    description: 'Authentic North Indian and Chinese cuisine with a modern twist.',
  },
  {
    id: 2,
    restaurantId: 'r002',
    name: 'Urban Tandoor',
    img: 'https://images.unsplash.com/photo-1605478522026-6c75152ab9a7',
    description: 'Tandoori grills and street food served in a cozy atmosphere.',
  },
  {
    id: 3,
    restaurantId: 'r003',
    name: 'Masala Magic',
    img: 'https://images.unsplash.com/photo-1555992336-cbfdb0f3f031',
    description: 'Spicy Indian delicacies with flavorful curries and biryanis.',
  },
  {
    id: 4,
    restaurantId: 'r004',
    restaurant: 'Biryani Bar',
    img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
    description: 'Home of the best dum biryani and Mughlai dishes.',
  },
  {
    id: 5,
    restaurantId: 'r005',
    name: 'Chow Mein Express',
    img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
    description: 'Fast, fresh, and fiery Indo-Chinese food.',
  },
];
export default function SearchRestaurants() {

  const[search,setSearch]=useState()
  const route = useRoute();
 const value = route?.params?.value ?? null;

 useEffect(() => {
  const delayDebounce = setTimeout(() => {
    getCategoriesList();
  }, 400); // delay for debounce

  return () => clearTimeout(delayDebounce);
}, [search]);

  useEffect(()=>{
    getCategoriesList()
      },[])
      const [items, setItems] = useState([]);
    
     const getCategoriesList = () => {
  const endPoint = `${EndPoints.search}?keyword=${search || ''}`;
  Service.getUsingToken(
    endPoint,
    (res) => {
      setItems(res?.list || []);
    },
    (err) => {
      console.error('Search error:', err);
    }
  );
};



  const inputRef = useRef(null);


useEffect(() => {
   if(!!value){
    setSearch(value)
  }else{
    setSearch('')
  }
  const timeout = setTimeout(() => {
    inputRef.current?.focus();
  }, 1); // slight delay to ensure screen is mounted

  return () => clearTimeout(timeout);
}, []);

  const navigation=useNavigation()

    function renderRestaurants({item}){
        return <SearchRestaurantItem {...item} />
    }
 
  return (
   
      <View
        style={{
          backgroundColor: Colorss.black,
          flex: 1,
          paddingTop: AppUtil.getHP(4),
        }}
      >
        <TouchableWithoutFeedback
          onPress={()=>navigation.goBack()}
        >
          <Image
            source={require("../../assets/drawables/back.png")}
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
           
            backgroundColor: Colorss.white,
            borderRadius: AppUtil.getWP(5),
            marginTop: AppUtil.getHP(2),
            padding: AppUtil.getWP(2),
            flexDirection: "row",
          }}
        >
          <Ionicons name="search" size={24} color="#757575" style={{}} />

          <TextInput
           ref={inputRef}
            placeholder="Search for dishes"
            value={search}
            onChangeText={(text)=>setSearch(text)}
            placeholderTextColor="#757575"
            style={{
              color: Colorss.black,
              marginHorizontal: AppUtil.getWP(4), // Adjust as needed
              // Adjust as needed
              fontSize: dynamicFontSize,
            }}
          />

        </View>
       <KeyboardAwareScrollView>


          <FlatList data={items} renderItem={renderRestaurants} keyExtractor={(item)=>item.id} scrollEnabled={false} showsVerticalScrollIndicator={false}/>
       </KeyboardAwareScrollView>
       

      </View>
   
  );
}
