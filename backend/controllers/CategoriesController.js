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

// Controller to create a new category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded', result_flag: 0 });
        }

        const newItem = new Category({
            name,
            url: file.path,
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

// Controller to get the list of categories
const getCategory = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({
            message: 'Category List fetched successfully',
            result_flag: 1,
            categories,
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
