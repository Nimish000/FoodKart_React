const express = require('express');
// const { registerUser, authUser } = require('../controllers/userController.js');
const { registerUser } = require('../controllers/userController.js');
const { authUser } = require('../controllers/authController.js');
// const { upload, uploadItem, getItems } = require('../controllers/uploadController');

const router = express.Router()
const multer = require('multer');
const { getBanners } = require('../controllers/GetApi.js');
const { uploadMenuItem, uploadMenu,getMenuItems } = require('../controllers/MenuController.js');
const { createCategory, getCategory, uploadC } = require('../controllers/CategoriesController.js');
const { uploadRestaurant, uploadItemRestaurant, getRestaurantList } = require('../controllers/restaurantsController.js');
const { getCartlist, uploadCartItem, uploadCartRemove } = require('../controllers/CartController.js');
const upload = multer();

router.route('/register').post(upload.any(),registerUser);
console.log("Route Test");

router.route('/login').post(upload.any() ,authUser);

//banners list
router.get('/banners', getBanners);

//menu dishes
// router.post('/menu-list', getMenuItems);
router.route('/menu-list').post(upload.any(),getMenuItems);



router.post('/menu', uploadMenu.single('url'), uploadMenuItem);

//categories
router.post('/upload_categories', uploadC.single('url'), createCategory);
router.get('/categories', getCategory);

//
router.post('/restaurants',uploadRestaurant.single('url'),uploadItemRestaurant);
router.get('/restaurant-list',getRestaurantList)

// cart
router.route('/cart-list').post(upload.any(),getCartlist);
router.route('/cart-remove').post(upload.any(),uploadCartRemove);


// router.post('/cart-list',getCartlist)
router.route('/cart').post(upload.any(),uploadCartItem);

// router.post('/cart',uploadCartItem)




module.exports=router;