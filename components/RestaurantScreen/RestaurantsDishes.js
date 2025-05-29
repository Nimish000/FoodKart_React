import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import RestaurantDishesItem from './RestaurantDishesItem'
import { EndPoints } from '../../Utils/Service/Endpoint';
import { Service } from '../../Utils/Service/Service';
import { useUser } from "../../store/UserContext.js";

const Data = [
  {
    id: 1,
    foodId: 'f001',
    isVeg: true,
    name: 'Paneer Butter Masala',
    price: 220,
    rating: 4.5,
    description: 'Cottage cheese cubes in a rich tomato-based gravy.',
    img: 'https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2-500x500.jpg',
  },
  {
    id: 2,
    foodId: 'f002',
    isVeg: false,
    name: 'Chicken Biryani',
    price: 270,
    rating: 4.7,
    description: 'Fragrant basmati rice cooked with marinated chicken and spices.',
    img: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg',
  },
  {
    id: 3,
    foodId: 'f003',
    isVeg: true,
    name: 'Veg Manchurian',
    price: 180,
    rating: 4.3,
    description: 'Crispy vegetable balls in tangy Indo-Chinese sauce.',
    img: 'https://chefadora.b-cdn.net/Screenshot_2024_10_01_140619_572a1d5d13.jpg',
  },
  {
    id: 4,
    foodId: 'f004',
    isVeg: false,
    name: 'Mutton Rogan Josh',
    price: 320,
    rating: 4.6,
    description: 'Slow-cooked mutton curry in Kashmiri style.',
    img: 'https://static.toiimg.com/thumb/53192600.cms?width=1200&height=900',
  },
  {
    id: 5,
    foodId: 'f005',
    isVeg: true,
    name: 'Masala Dosa',
    price: 150,
    rating: 4.4,
    description: 'Crispy rice crepe stuffed with spicy mashed potatoes.',
    img: 'https://palatesdesire.com/wp-content/uploads/2022/09/Mysore-masala-dosa-recipe@palates-desire-500x500.jpg',
  },
];





export default function RestaurantsDishes({restaurantId}) {

   const { userDetails } = useUser();
   useEffect(()=>{
  getMenuList()
    },[])
    const [menu, setMenu] = useState([]);

    


  
   
 async function getMenuList() {
    const formData = new FormData();
    formData.append('restaurantId', restaurantId);



    try {
      Service.postFormDataFetch(
        EndPoints.getMenu,
        formData,
        (res) => {
          console.log(res);
          if (res.result_flag === 1) {
            
           console.log("data----->",res)
          setMenu(res?.list)
          } else {
            // alert('Some user error');
           console.log("Some user error",)
           console.log(_id)

          }
        },
        (err) => {
          console.log("###", err);
        }
      );
    } catch (error) {
      console.error('Error uploading item:', error);
    }
  }

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
          console.log(res);
          if (res.result_flag === 1) {
            alert('Added to cart');
            getMenuList()
          } else {
            alert('Failed to upload item');
          }
        },
        (err) => {
          console.log("###", err);
        }
      );
    } catch (error) {
      console.error('Error uploading item:', error);
      alert('Error uploading item');
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
          console.log(res);
          if (res.result_flag === 1) {
            alert('Removed from cart');
            getMenuList()
          } else {
            alert('Item not exists');
          }
        },
        (err) => {
          console.log("###", err);
        }
      );
    } catch (error) {
      console.error('Error uploading item:', error);
      alert('Error uploading item');
    }
  }
    function renderDishes({item}){
        return <RestaurantDishesItem {...item} onPress={() => {
     
        addToCart(item._id, item.restaurantId);
      }}  
       onRemove={() => {
        
        removeFromCart(item._id, item.restaurantId);
      }}/>
    }
  return (
    <FlatList renderItem={renderDishes} data={menu} keyExtractor={(item)=>item.id} scrollEnabled={false} showsVerticalScrollIndicator={false}/>
  )
}