import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
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
import { CardField, confirmPayment } from "@stripe/stripe-react-native";

export default function CartScreen() {
  const [totalPrice, setTotalPrice] = useState(0); // ⬅️ Add this line

  const [loading, setLoading] = useState(false); // ✅ loader state
  const [clientSecret, setClientSecret] = useState(); // ✅ loader state

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
            // alert("Order Successfully Placed");
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
  async function handlePayment() {
    if (!cardDetails?.complete) {
      Alert.alert("Invalid card", "Please enter a valid card");
      return;
    }

    const amountInPaise = Math.max(Math.round(totalPrice * 100), 5000); // Ensure minimum ₹50

    try {
      const formData = new FormData();
      formData.append("amount", amountInPaise);

      // Wait for client secret response from your backend
      const res = await new Promise((resolve, reject) => {
        Service.postFormDataFetch(
          EndPoints.stripe,
          formData,
          (response) => resolve(response),
          (error) => reject(error)
        );
      });

      const clientSecret = res?.clientSecret;
      if (!clientSecret) {
        Alert.alert("Error", "Failed to get client secret");
        return;
      }

      console.log(`-----> Client Secret: ${clientSecret} <-----`);

      // Confirm the payment
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails: {
            email: userDetails?.email || "test@example.com",
          },
        },
      });

      if (error) {
        Alert.alert("Payment failed", error.message);
      } else if (paymentIntent) {
        Alert.alert("Payment Successful", "Your order is being placed.");
        setModalVisible(false);
        createRecentOrder(); // call only if success
      }
    } catch (err) {
      console.log("Stripe payment error", err);
      Alert.alert("Error", "Payment failed. Try again.");
    }
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [cardDetails, setCardDetails] = useState();

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
          <Cart
            list={cart}
            setTotalPrice={setTotalPrice}
            refreshCart={getMenuList}
          />

          {/* After cart items */}
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true), getMenuList();
            }}
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: Colorss.lightGrey,
              fontSize: dynamicFontSize * 1.2,
            }}
          >
            Oops! Nothing in the cart yet.
          </Text>
        </View>
      )}

      {/* Stripe Card Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            padding: AppUtil.getHP(2),
            justifyContent: "center",
            backgroundColor: Colorss.grey,
            marginTop: AppUtil.getHP(10),
            borderTopStartRadius: AppUtil.getWP(5),
            borderTopRightRadius: AppUtil.getWP(5),
          }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 1.2,
              color: Colorss.white,
              marginBottom: AppUtil.getHP(0.6),
              fontWeight: 500,
              textAlign:'center'
            }}
          >
            Enter Card Details
          </Text>

          <CardField
            postalCodeEnabled={false}
            placeholder={{ number: "4242 4242 4242 4242" }}
            cardStyle={{
              backgroundColor: Colorss.white,
              textColor: "#000",
            }}
            style={{
              height: AppUtil.getHP(5),
              marginVertical: AppUtil.getHP(3),
            }}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />

          <TouchableOpacity
            onPress={handlePayment}
            style={{
              backgroundColor: Colorss.red,
              padding: 15,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: dynamicFontSize,
                fontWeight: 500,
              }}
            >
              Pay ₹{totalPrice}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ marginTop: AppUtil.getHP(3) }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "red",
                fontSize: dynamicFontSize * 1,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
