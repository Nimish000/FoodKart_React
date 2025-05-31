const mongoose = require("mongoose");

const RecentOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    restaurantName: {
      type: String,
      
      required: true,
    },
     totalBill: {
      type: String,
      
      required: true,
    },
    items: [
      {
      itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },
        quantity: Number,
        name:String,
        url:String
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
 const RecentOrder=mongoose.model("RecentOrder",RecentOrderSchema)


module.exports={
  RecentOrder
}
