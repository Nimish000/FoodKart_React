const { default: mongoose } = require("mongoose");

const cartSchema=mongoose.Schema(
    {
       userId: String,
  restaurantId: String,
  itemId: String,
  name: String,
  price: Number,
  url: String,
  qty: Number,
  isVeg: Boolean
    },{
        timestamps:true
    }
)

const Cart=mongoose.model("Cart",cartSchema)

module.exports={Cart}