import { View, FlatList } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import RestaurantDishesItem from './RestaurantDishesItem';
import { EndPoints } from '../../Utils/Service/Endpoint';
import { Service } from '../../Utils/Service/Service';
import { useUser } from "../../store/UserContext.js";
import { ActivityIndicator } from 'react-native-paper';

export default function RestaurantsDishes({ restaurantId, searchText }) {
  const [menu, setMenu] = useState([]);
  const [originalMenu, setOriginalMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userDetails } = useUser();
  const debounceRef = useRef(null);

  useEffect(() => {
    getMenuList();
  }, []);

  async function getMenuList() {
    const formData = new FormData();
    formData.append('restaurantId', restaurantId);
    setLoading(true);

    try {
      Service.postFormDataFetch(
        EndPoints.getMenu,
        formData,
        (res) => {
          if (res.result_flag === 1) {
            setOriginalMenu(res.list);
            setMenu(res.list);
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

  // 🔍 Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (searchText) {
        const lowerSearch = searchText.toLowerCase();
        const filtered = originalMenu.filter(item =>
          item.name.toLowerCase().includes(lowerSearch)
        );
        setMenu(filtered);
      } else {
        setMenu(originalMenu);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceRef.current);
  }, [searchText, originalMenu]);

  async function addToCart(itemId, restaurantId) {
    const formData = new FormData();
    formData.append('userId', userDetails._id);
    formData.append('restaurantId', restaurantId);
    formData.append('itemId', itemId);

    try {
      Service.postFormDataFetch(
        EndPoints.cart,
        formData,
        (res) => {
          if (res.result_flag === 1) getMenuList();
        },
        (err) => console.error("###", err)
      );
    } catch (error) {
      console.error('Error uploading item:', error);
    }
  }

  async function removeFromCart(itemId, restaurantId) {
    const formData = new FormData();
    formData.append('userId', userDetails._id);
    formData.append('restaurantId', restaurantId);
    formData.append('itemId', itemId);

    try {
      Service.postFormDataFetch(
        EndPoints.cart_remove,
        formData,
        (res) => {
          if (res.result_flag === 1) getMenuList();
        },
        (err) => console.error("###", err)
      );
    } catch (error) {
      console.error('Error uploading item:', error);
    }
  }

  function renderDishes({ item }) {
    return (
      <RestaurantDishesItem
        {...item}
        onPress={() => addToCart(item._id, item.restaurantId)}
        onRemove={() => removeFromCart(item._id, item.restaurantId)}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <FlatList
          data={menu}
          renderItem={renderDishes}
          keyExtractor={(item) => item.id?.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
