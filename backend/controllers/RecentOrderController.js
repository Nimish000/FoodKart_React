const { Cart } = require("../models/CartSchema");
const { Menu } = require("../models/MenuSchema");
const { RecentOrder } = require("../models/RecentOrderSchema");
const { RestaurantSchema } = require("../models/RestaurantSchema");

const createRecentOrder = async (req, res) => {
  try {
    let { userId, restaurantId, items,totalBill } = req.body;
    items = JSON.parse(items); // Fixed: Parse the stringified array

          const restaurant=await RestaurantSchema.findOne({_id:restaurantId})
          let restaurantName=restaurant.name


    const newOrder = new RecentOrder({
      userId,
      restaurantId,
      restaurantName,
      totalBill,
      items,
      status: "Pending",
    });


    await newOrder.save();
    await Cart.deleteMany({ userId });
     const updateQtyPromises = items.map(item => {
      return Menu.updateOne(
        { _id: item.itemId },
        { $set: { qty: 0 } }
      );
    });

    await Promise.all(updateQtyPromises);

    res.status(200).json({
      message: "Recent order saved",
      result_flag: 1,
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", result_flag: 0 });
  }
};

const getRecentOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await RecentOrder.find({ userId })
      .sort({ createdAt: -1 }) // recent first
      .limit(10); // limit to latest 10 orders


    res.status(200).json({
      message: "Recent orders fetched",
      result_flag: 1,
      orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", result_flag: 0 });
  }
};
module.exports = { createRecentOrder,getRecentOrders };
