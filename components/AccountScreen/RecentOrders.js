import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import RecentOrderItem from './RecentOrderItem';
import { _baseURL, AppUtil, dynamicFontSize } from '../../Utils/AppUtils';
import { useUser } from '../../store/UserContext';
import { Colorss } from '../../Colors/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { Service } from '../../Utils/Service/Service';
import { EndPoints } from '../../Utils/Service/Endpoint';


// delete when using api 
const DATA = [
    { id: '1', item: 'Cheese Burst Pizza, Garlic Bread',restaurantName:'Pizza Hut',price:'550',img:`${_baseURL}uploads/1747941919716.jpg` },
    { id: '2', item: 'Pasta',restaurantName:'Billu Hut',price:'220',img:`${_baseURL}uploads/1747941919716.jpg` },
    { id: '3', item: 'Burger',restaurantName:'Chinese Cousine',price:'145',img:`${_baseURL}uploads/1747941919716.jpg` },
    { id: '4', item: 'Burger',restaurantName:'Chinese Cousine',price:'145',img:`${_baseURL}uploads/1747941919716.jpg` },

    { id: '5', item: 'Burger',restaurantName:'Chinese Cousine',price:'145',img:`${_baseURL}uploads/1747941919716.jpg` },

    { id: '6', item: 'Burger',restaurantName:'Chinese Cousine',price:'145',img:`${_baseURL}uploads/1747941919716.jpg` },

    { id: '7', item: 'Burger',restaurantName:'Chinese Cousine',price:'145',img:`${_baseURL}uploads/1747941919716.jpg` },
    { id: '8', item: 'Burger',restaurantName:'Chinese Cousine',price:'145',img:`${_baseURL}uploads/1747941919716.jpg` },

  ];


export default function RecentOrders() {

    const{userDetails}=useUser()
  
    const[loading,setLoading]=useState(false)
    const[recentOrder,setRecentOrder]=useState()


 useFocusEffect(
    useCallback(() => {
      getRecentOrders();
    }, [])
  );

  async function getRecentOrders() {
    const formData = new FormData();
    formData.append('userId', userDetails._id);
    setLoading(true);

    try {
      Service.postFormDataFetch(
        EndPoints.recentOrder,
        formData,
        (res) => {
          if (res.result_flag === 1) {
           setRecentOrder(res.orders)
          }
          setLoading(false);
        },
        (err) => {
          console.error("###", err);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error('Error uploading item:', error);
      setLoading(false);
    }
  }

    
    function renderItem({item}) {
        return <RecentOrderItem {...item} />;
    }
        
    
    
  return (<View>
{loading?(
  <ActivityIndicator size='large' color='white'/>
):(<View style={{paddingBottom:AppUtil.getHP(6),flex:1}}>
  <Text style={styles.sectionTitle}>Recent Orders</Text>
    
    {recentOrder && recentOrder.length > 0?(<FlatList
    data={recentOrder}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    scrollEnabled={false}
  />):(<View style={{}}>
    <Text style={{flex:1,textAlign:'center',fontSize:dynamicFontSize,color:Colorss.lightGrey,marginTop:AppUtil.getHP(5)}}>No Recent Orders</Text>
    </View>)}
    </View>)}
    
  </View>

  )
}


const styles = StyleSheet.create({
    item: {
      padding: 20,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    title: {
      fontSize: 18,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
      },
  });