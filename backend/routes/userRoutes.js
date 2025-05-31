const express = require('express');
// const { registerUser, authUser } = require('../controllers/userController.js');
const { registerUser } = require('../controllers/userController.js');
const { authUser, updateUserItem, getUser } = require('../controllers/authController.js');
// const { upload, uploadItem, getItems } = require('../controllers/uploadController');
const { getRecentOrders,createRecentOrder } = require('../controllers/RecentOrderController.js');


const router = express.Router()
const multer = require('multer');
const { getBanners } = require('../controllers/GetApi.js');
const { uploadMenuItem, uploadMenu,getMenuItems } = require('../controllers/MenuController.js');
const { createCategory, getCategory, uploadC } = require('../controllers/CategoriesController.js');
const { uploadRestaurant, uploadItemRestaurant, getRestaurantList, getSearch } = require('../controllers/restaurantsController.js');
const { getCartlist, uploadCartItem, uploadCartRemove } = require('../controllers/CartController.js');
const { stripePayment } = require('../controllers/stripeController.js');
const upload = multer();

router.route('/register').post(upload.any(),registerUser);
console.log("Route Test");

router.route('/login').post(upload.any() ,authUser);

//user
router.post('/user-update',uploadRestaurant.single('url'),updateUserItem);
router.route('/user').post(upload.any(),getUser);



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

router.get('/search',getSearch)




// cart
router.route('/cart-list').post(upload.any(),getCartlist);
router.route('/cart-remove').post(upload.any(),uploadCartRemove);

router.route('/cart').post(upload.any(),uploadCartItem);


//recent orders
router.route('/recentOrders').post(upload.any(),getRecentOrders);
router.route('/recentOrders-update').post(upload.any(),createRecentOrder);

//stripe payment gateway

router.route('/create-payment-intent').post(upload.any(),stripePayment);








module.exports=router;