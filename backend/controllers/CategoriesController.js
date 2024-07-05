// controllers/categoryController.js

const Category = require("../models/Categories");
const multer = require('multer');
const path = require('path');


// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    },
  });
  
  const uploadC = multer({ storage });
// GET all categories
const createCategory = async (req, res) => {
    try {
      const { name,image } = req.body;
      const file = req.file;
  
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded', result_flag: 0 });
      }
  
      const newItem = new Item({
        name,
        image: file.path,
      });
  
      await newItem.save();
  
      res.status(200).json({
        message: 'Category Item uploaded successfully',
        result_flag: 1,
        item: newItem,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error', result_flag: 0 });
    }
  };

// Controller to get the list of items
const getCategory = async (req, res) => {
    try {
      const banners = await Category.find({});
      res.status(200).json({
        message: 'Category List fetched successfully',
        result_flag: 1,
        banners,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error', result_flag: 0 });
    }
  };

module.exports = {
    uploadC,
  getCategory,
  createCategory,
};
