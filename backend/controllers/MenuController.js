const multer = require("multer");
const path = require("path");
const {  Menu } = require("../models/MenuSchema");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/dishes"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  },
});

const uploadMenu = multer({ storage });

const uploadMenuItem = async (req, res) => {
  try {
    const { name,
      price,
      description,
      rating,
      qty,
      isVeg,restaurantId} = req.body;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ message: "No file uploaded", result_flag: 0 });
    }

    const newMenuItem = new Menu({
      name,
      price,
      description,
      rating,
      qty,
      isVeg,
      url: file.path,
      restaurantId
    });

    await newMenuItem.save();

    res.status(200).json({
      message: "Dish added",
      result_flag: 1,
      item: newMenuItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", result_flag: 0 });
  }
};

// Controller to get the list of items
const getMenuItems = async (req, res) => {
  const {restaurantId}=req.body;
  try {
    const list = await Menu.find({restaurantId});
    res.status(200).json({
      message: 'Item List fetched successfully',
      result_flag: 1,
      list,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', result_flag: 0 });
  }
};
module.exports = {
  uploadMenu,
  uploadMenuItem,
  getMenuItems
};
