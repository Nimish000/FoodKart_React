const express = require('express');
// const { registerUser, authUser } = require('../controllers/userController.js');
const { registerUser } = require('../controllers/userController.js');
const { authUser } = require('../controllers/authController.js');
// const { upload, uploadItem, getItems } = require('../controllers/uploadController');

const router = express.Router()
const multer = require('multer');
const { getBanners, getItems } = require('../controllers/GetApi.js');
const { uploadItem, uploadM } = require('../controllers/PostApi.js');
const { createCategory, getCategory, uploadC } = require('../controllers/CategoriesController.js');
const upload = multer();

router.route('/register').post(upload.any(),registerUser);
console.log("Route Test");

router.route('/login').post(upload.any() ,authUser);

//banners list
router.get('/banners', getBanners);

//items
router.get('/items', getItems);


router.post('/upload', uploadM.single('photo'), uploadItem);

//categories
router.post('/upload_categories', uploadC.single('photo'), createCategory);
router.get('/categories', getCategory);




module.exports=router;