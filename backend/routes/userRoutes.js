const express = require('express');
// const { registerUser, authUser } = require('../controllers/userController.js');
const { registerUser } = require('../controllers/userController.js');
const { authUser } = require('../controllers/authController.js');

const router = express.Router()
const multer = require('multer');
const { getBanners } = require('../controllers/GetApi.js');
const upload = multer();

router.route('/register').post(upload.any(),registerUser);
console.log("Route Test");

router.route('/login').post(upload.any() ,authUser);
router.get('/banners', getBanners);

module.exports=router;