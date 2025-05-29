const multer = require("multer");
const { Menu } = require("../models/MenuSchema");
const { Cart } = require("../models/CartSchema");

const uploadCartItem = async (req, res) => {
  try {
    const{
        userId,
        restaurantId,
        itemId
    }=req.body;

    const dish = await Menu.findOne({ _id: itemId});
        if (!dish) {
      return res.status(404).json({
        message: "Dish not found",
        result_flag: 0,
        item:itemId
      });
    }


  const existingCartItems = await Cart.find({ userId });

    if (
      existingCartItems.length > 0 &&
      existingCartItems[0].restaurantId !== restaurantId
    ) {
      // Remove all items from the cart (if from another restaurant)
      console.log( existingCartItems)
      await Cart.deleteMany({ userId });
    }

    
    // Check if item already in cart
    let cartItem = await Cart.findOne({ userId ,itemId});

    if (cartItem) {
      // Increase quantity if already exists
      cartItem.qty += 1;
      dish.qty+=1;
      await dish.save()
      await cartItem.save();
    } else {
      // Add new item to cart
      cartItem = new Cart({
        userId,
        restaurantId,
        itemId,
        name: dish.name,
        price: dish.price,
        url: dish.url,
        qty: 1,
        isVeg: dish.isVeg,
      });
      await cartItem.save();
      dish.qty=1
      await dish.save()
    }

    res.status(200).json({
        message:"Dish Added to Cart",
        userId:userId,
        result_flag:1,
        dish:cartItem
    })
  
} catch (error) {
   console.error(error);
    res.status(500).json({ message: "Server Error", result_flag: 0 });
}


 
};


const getCartlist =async(req,res)=>{
    try{
     const { userId } = req.body;

        const list=await Cart.find({userId})
        // console.log(list)
        res.status(200).json({
            message: 'Cart List fetched successfully',
      result_flag: 1,
      list,
        })
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', result_flag: 0 });
  }
}

const uploadCartRemove = async (req, res) => {
  try {
    const{
        userId,
        itemId
    }=req.body;

    const dish = await Menu.findOne({ _id: itemId});
    
    // Check if item already in cart
    let cartItem = await Cart.findOne({ userId ,itemId});

    if (!cartItem) {
      // Item not found in cart
      return res.status(404).json({
        message: "Item not found in cart",
        userId,
        result_flag: 0,
      });
    }

    // Decrement quantity
    cartItem.qty -= 1;
    dish.qty-=1;
    await dish.save()

    if (cartItem.qty <= 0) {
      // Remove item from cart if qty is 0 or less
      await Cart.deleteOne({ _id: cartItem._id });
      return res.status(200).json({
        message: "Dish removed from cart",
        userId,
        result_flag: 1,
        dish: null,
      });
    } else {
      // Save updated quantity
      await cartItem.save();
      return res.status(200).json({
        message: "Dish quantity decreased in cart",
        userId,
        result_flag: 1,
        dish: cartItem,
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", result_flag: 0 });
  }
};

module.exports={
    getCartlist,uploadCartItem,uploadCartRemove
}
