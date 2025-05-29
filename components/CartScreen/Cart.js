import { View, Text, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useUser } from "../../store/UserContext";
import { Service } from "../../Utils/Service/Service";
import { EndPoints } from "../../Utils/Service/Endpoint";
import { useFocusEffect } from "@react-navigation/native";
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
  const { userDetails } = useUser();
  useFocusEffect(
  useCallback(() => {
    getMenuList();
  }, [])
);
  const [cart, setCart] = useState([]);

  async function getMenuList() {
    const formData = new FormData();
    formData.append("userId", userDetails._id);

    try {
      Service.postFormDataFetch(
        EndPoints.getCart,
        formData,
        (res) => {
          console.log(res);
          if (res.result_flag === 1) {
            console.log("data----->", res);
            setCart(res?.list);
          } else {
            // alert('Some user error');
            console.log("Some user error");
            console.log(_id);
          }
        },
        (err) => {
          console.log("###", err);
        }
      );
    } catch (error) {
      console.error("Error uploading item:", error);
    }
  }

  async function addToCart(itemId, restaurantId) {
    const formData = new FormData();
    formData.append("userId", userDetails._id);
    formData.append("restaurantId", restaurantId);

    formData.append("itemId", itemId);

    try {
      Service.postFormDataFetch(
        EndPoints.cart,
        formData,
        (res) => {
          console.log(res);
          if (res.result_flag === 1) {
            
            getMenuList();
          } else {
            alert("Failed to upload item");
          }
        },
        (err) => {
          console.log("###", err);
        }
      );
    } catch (error) {
      console.error("Error uploading item:", error);
      alert("Error uploading item");
    }
  }

  async function removeFromCart(itemId, restaurantId) {
    const formData = new FormData();
    formData.append("userId", userDetails._id);
    formData.append("restaurantId", restaurantId);

    formData.append("itemId", itemId);

    try {
      Service.postFormDataFetch(
        EndPoints.cart_remove,
        formData,
        (res) => {
          console.log(res);
          if (res.result_flag === 1) {
          
            getMenuList();
          } else {
            alert("Item not exists");
          }
        },
        (err) => {
          console.log("###", err);
        }
      );
    } catch (error) {
      console.error("Error uploading item:", error);
      alert("Error uploading item");
    }
  }

  function renderItem({ item }) {
    return (
      <CartItem
        {...item}
        onPress={() => {
          addToCart(item.itemId, item.restaurantId);
        }}
        onRemove={() => {
          removeFromCart(item.itemId, item.restaurantId);
        }}
      />
    );
  }

  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={cart}
        key={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
