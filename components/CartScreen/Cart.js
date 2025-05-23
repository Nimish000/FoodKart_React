import { View, Text, FlatList } from 'react-native'
import React from 'react'
import CartItem from './CartItem';
const Data = [
    {
      id: "1",
      itemName: "Cheese Margherita Pizza",
      price: 299,
      img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
      quantity: 2,
    },
    {
      id: "2",
      itemName: "Veggie Burger",
      price: 199,
      img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
      quantity: 1,
    },
    {
      id: "3",
      itemName: "Crispy French Fries",
      price: 149,
      img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
      quantity: 3,
    },
    {
        id: "4",
        itemName: "Crispy French Fries",
        price: 149,
        img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        quantity: 3,
      },
      {
        id: "5",
        itemName: "Crispy French Fries",
        price: 149,
        img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        quantity: 3,
      },
      {
        id: "6",
        itemName: "Crispy French Fries",
        price: 149,
        img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        quantity: 3,
      },
      {
        id: "7",
        itemName: "Crispy French Fries",
        price: 149,
        img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
        quantity: 3,
      },
  ];
  
 
  
export default function Cart() {

     function renderItem({item}) {
        return <CartItem {...item}/>;
        
    }

  return (
    <View>
      <FlatList scrollEnabled={false} data={Data} key={(item)=>item.id} renderItem={renderItem}/>
    </View>
  )
}