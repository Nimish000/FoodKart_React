const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: false,
    },
    isVeg: {
      type: Boolean,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    restaurantId:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = { Menu };
