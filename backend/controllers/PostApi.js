const multer = require('multer');
const path = require('path');
const { Item } = require('../models/Schema');


// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  },
});

const uploadM = multer({ storage });

const uploadItem = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded', result_flag: 0 });
    }

    const newItem = new Item({
      name,
      price,
      description,
      url: file.path,
    });

    await newItem.save();

    res.status(200).json({
      message: 'Item uploaded successfully',
      result_flag: 1,
      item: newItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', result_flag: 0 });
  }
};



module.exports = {
    uploadM,
  uploadItem,
  
};
