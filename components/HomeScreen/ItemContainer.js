import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import ItemContainerData from './ItemContainerData';
import { EndPoints } from '../../Utils/Service/Endpoint';
import { Service } from '../../Utils/Service/Service';

export default function ItemContainer({limit,islimit}) {

  useEffect(()=>{
    getCategoriesList()
      },[])
      const [items, setItems] = useState([]);
    
      const getCategoriesList = () => {
    
        var endPoint = EndPoints.items ;
        Service.getUsingToken(endPoint, (res) => {
            console.log("item data----->",res)
            setItems(res?.items)
            console.log("get item",items[0])
    
        },
            (err) => {
            }
        );
    };

    const Data = [
        { id: 1, image: require('../../assets/drawables/1.jpg'), name: "Pancake"                 ,price:"$30"},
        { id: 2, image: require('../../assets/drawables/pasta.jpg'), name: "Pasta"               ,price:"$30"},
        { id: 3, image: require('../../assets/drawables/rajkachori.jpg'), name: "Raj Kachori"    ,price:"$30"},
        { id: 4, image: require('../../assets/drawables/samosa.jpg'), name: "Samosa"             ,price:"$30"},
        { id: 5, image: require('../../assets/drawables/shahi.jpg'), name: "Paneer"              ,price:"$30"},
        { id: 6, image: require('../../assets/drawables/vadapao.jpg'), name: "VadaPao"           ,price:"$30"},
        { id: 7, image: require('../../assets/drawables/dosa.jpeg'), name: "Dosa"                ,price:"$30"},
        { id: 8, image: require('../../assets/drawables/chilipotato.jpg'), name: "Chili Potato"  ,price:"$30"},
        { id: 9, image: require('../../assets/drawables/jalebi.jpg'), name: "Jalebi"             ,price:"$30"},
        { id: 10, image:require('../../assets/drawables/panipuri.webp'), name: "Panipuri"        ,price:"$30"},
    ];
    
      function renderItemHandler(itemData) {
        return <ItemContainerData {...itemData.item} />;
      }
    //   if(islimit){4444
    //     setNewData(Data.slice(0,limit))
    //   }else{
    //     setNewData(Data)
    //   }
      return (
        <FlatList
        
        data={items}
        // data={islimit?Data.slice(0,limit):Data}

        renderItem={renderItemHandler}
        keyExtractor={(item) => item.id}
        horizontal={false} // Set to true for horizontal layout
         // Set the number of columns (change as needed)
         numColumns={2}
         scrollEnabled={false}
         
      />
      );
}