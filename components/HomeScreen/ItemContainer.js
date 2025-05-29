import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import ItemContainerData from './ItemContainerData';
import { EndPoints } from '../../Utils/Service/Endpoint';
import { Service } from '../../Utils/Service/Service';
import { Colorss } from '../../Colors/Colors';
import { AppUtil, dynamicFontSize } from '../../Utils/AppUtils';

export default function ItemContainer({limit,islimit}) {

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

  
    
      function renderItemHandler(itemData) {
        return <ItemContainerData {...itemData.item} />;
      }
    //   if(islimit){4444
    //     setNewData(Data.slice(0,limit))
    //   }else{
    //     setNewData(Data)
    //   }
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
          TOP RESTAURANTS TO EXPLORE
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
        
        data={items}
        // data={islimit?Data.slice(0,limit):Data}

        renderItem={renderItemHandler}
        keyExtractor={(item) => item.id}
        horizontal={false} // Set to true for horizontal layout
         // Set the number of columns (change as needed)
      
         scrollEnabled={false}
         
      />
        </View>

      );
}