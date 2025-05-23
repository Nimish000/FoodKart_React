import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import RecentOrderItem from './RecentOrderItem';
import { _baseURL, AppUtil } from '../../Utils/AppUtils';


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
    function renderItem({item}) {
        return <RecentOrderItem {...item} />;
    }
        
    
    
  return (
    <View style={{paddingBottom:AppUtil.getHP(6)}}>
  <Text style={styles.sectionTitle}>Recent Orders</Text>
    <FlatList
    data={DATA}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    scrollEnabled={false}
  />
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