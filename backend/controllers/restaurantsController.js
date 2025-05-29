const multer = require("multer");
const path = require("path");
const { RestaurantSchema } = require("../models/RestaurantSchema");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/restaurants");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadRestaurant = multer({ storage });

const uploadItemRestaurant = async (req, res) => {
  try {
    const { name, rating, time, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No file Uploaded",
        result_flag: 0,
      });
    }

    const newRestaurant = new RestaurantSchema({
      name,
      rating,
      time,
      description,
      url: file.path.replace(/\\/g, "/"),
    });

    await newRestaurant.save();

    res.status(200).json({
      message: "Restaurant added successfully",
      result_flag: 1,
      item: newRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", result_flag: 0 });
  }
};

// Controller to get the list of categories
const getRestaurantList = async (req, res) => {
    try {
        const list = await RestaurantSchema.find({});
        res.status(200).json({
            message: 'Restaurants List fetched successfully',
            result_flag: 1,
            list,
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', result_flag: 0 });
    }
};

module.exports={
    uploadRestaurant,
    uploadItemRestaurant,
    getRestaurantList
}
