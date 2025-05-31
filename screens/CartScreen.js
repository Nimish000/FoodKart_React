import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { Colorss } from "../Colors/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { AppUtil, dynamicFontSize } from "../Utils/AppUtils";
import CartItem from "../components/CartScreen/CartItem";
import Cart from "../components/CartScreen/Cart";
import { useUser } from "../store/UserContext";
import { useFocusEffect } from "@react-navigation/native";
import { Service } from "../Utils/Service/Service";
import { EndPoints } from "../Utils/Service/Endpoint";

export default function CartScreen() {
  const [totalPrice, setTotalPrice] = useState(0); // ⬅️ Add this line

  const [loading, setLoading] = useState(false); // ✅ loader state
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
            createRecentOrder();
          } else {
            // alert('Some user error');
            console.log("Some user error");
            // console.log(_id);
          }
        },
        (err) => {
          console.log("###", err);
        }
      );
    } catch (error) {}
  }

  async function createRecentOrder() {
    if (cart.length === 0) {
      Alert.alert("Cart is empty");
      return;
    }

    const items = {
      orders: cart.map((item) => ({
        itemId: item.itemId,
        name: item.name,
        qty: item.qty,
        url: item.url,
      })),
    };
    console.log(`items->>>${items}`);
    const formData = new FormData();
    formData.append("userId", userDetails._id);
    formData.append("restaurantId", cart[0].restaurantId);
    formData.append("totalBill", totalPrice);

    formData.append(
      "items",
      JSON.stringify(
        cart.map((item) => ({
          itemId: item.itemId,
          name: item.name,
          qty: item.qty,
          price: item.price,
          isVeg: item.isVeg,
          url: item.url,
        }))
      )
    );

    setLoading(true); // ✅ start loading

    try {
      Service.postFormDataFetch(
        EndPoints.updateRecentOrder,
        formData,
        (res) => {
          // console.log(res);
          if (res.result_flag === 1) {
            // console.log("data----->", res);
            alert("Order Successfully Placed");
            setLoading(false);
            setCart(null);
          } else {
            // alert('Some user error');
            console.log("Some user error");
            setLoading(false);
          }
        },
        (err) => {
          console.log("###", err);
          setLoading(false);
        }
      );
    } catch (error) {}
  }

  function handleProceed() {
    getMenuList();
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colorss.black,
        paddingTop: AppUtil.getHP(6),
        padding: AppUtil.getHP(1),
      }}
    >
      <Text
        style={{
          fontSize: dynamicFontSize * 1.2,
          color: Colorss.white,
          margin: AppUtil.getWP(2),
        }}
      >
        My Cart
      </Text>

      <View
        style={{
          height: 1,
          backgroundColor: Colorss.grey,
          marginBottom: AppUtil.getWP(2),
        }}
      />
      {cart && cart.length > 0 ? (
        <ScrollView style={{ marginBottom: AppUtil.getHP(8) }}>
          <Cart list={cart} setTotalPrice={setTotalPrice}  refreshCart={getMenuList}/>

          {/* After cart items */}
          <TouchableOpacity
            onPress={handleProceed}
            style={{
              backgroundColor: Colorss.green,
              padding: AppUtil.getWP(2),
              borderRadius: AppUtil.getWP(5),
              margin: AppUtil.getHP(3),
            }}
          >
            <Text
              style={{ fontSize: dynamicFontSize * 1.2, textAlign: "center" }}
            >
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{ color: Colorss.lightGrey, fontSize: dynamicFontSize*1.2 }}>
            Oops! Nothing in the cart yet.
          </Text>
        </View>
      )}
    </View>
  );
}
