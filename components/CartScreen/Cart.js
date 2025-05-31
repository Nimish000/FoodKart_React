import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useUser } from "../../store/UserContext";
import { Service } from "../../Utils/Service/Service";
import { EndPoints } from "../../Utils/Service/Endpoint";
import { useFocusEffect } from "@react-navigation/native";
import { AppUtil, dynamicFontSize } from "../../Utils/AppUtils";
import { Colorss } from "../../Colors/Colors";
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

export default function Cart({list,setTotalPrice}) {
   const [loading, setLoading] = useState(false); // ✅ loader state
  const { userDetails } = useUser();
  useFocusEffect(
  useCallback(() => {
    getMenuList();
    // calculateBillDetails(cart)

    
  }, [list,cart])
);
function calculateBillDetails(cart) {
  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    const qty = item.quantity ?? item.qty ?? 1; // fallback to 1 if undefined
    totalQty += qty;
    totalPrice += item.price * qty;
  });

  setTotalPrice(totalPrice);
  setTotalQty(totalQty);
  setTotal(totalPrice)
}
  const [cart, setCart] = useState([]);
const [ totalQty, setTotalQty ] = useState(0);
const [ totalPrice, setTotal ] = useState(0);

  async function getMenuList() {
    const formData = new FormData();
    formData.append("userId", userDetails._id);
    setLoading(true); // ✅ start loading

    try {
      Service.postFormDataFetch(
        EndPoints.getCart,
        formData,
        (res) => {
          // console.log(res);
          if (res.result_flag === 1) {
            // console.log("data----->", res);
            setCart(res?.list);
            calculateBillDetails(res?.list)
            setLoading(false);
          } else {
            // alert('Some user error');
            console.log("Some user error");
            // console.log(_id);
            setLoading(false);
          }
        },
        (err) => {
          console.log("###", err);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error uploading item:", error);
      setLoading(false);
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
          // console.log(res);
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
          // console.log(res);
          if (res.result_flag === 1) {
          
            getMenuList();
             refreshCart();
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
      
      {loading ? (
        <ActivityIndicator size="large" color='white' />
      ) : (
        <View>

        <FlatList
          scrollEnabled={false}
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
         {/* Bill Details */}
      <View style={{ padding: 10, backgroundColor: '#333', borderRadius: 8, marginHorizontal: AppUtil.getWP(2), marginBottom: AppUtil.getHP(2) }}>
        <Text style={{ color: Colorss.white, fontSize: dynamicFontSize * 1.1 }}>
          Total Items: {totalQty}
        </Text>
        <Text style={{ color: Colorss.white, fontSize: dynamicFontSize * 1.1 }}>
          Total Amount: ₹ {totalPrice.toFixed(2)}
        </Text>
      </View>
        </View>
      )}
    </View>
  );
}
