const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const generateToken = require("../config/generateToken");
const multer = require('multer');
const upload =multer()
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role ,mobile} = req.body;

    if (!name || !email || !password || !role ||!mobile) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExists = await User.findOne({ email ,mobile});

    if (userExists) {
        res.status(400).json({
            message:"User already exists",
            result_flag:0,
        });
        throw new Error("User already exists");
    }
const status="Registerd Successfully"
const url="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"

const address=""

    const user = await User.create({
        status,
        name,
        email,
        password,
        role,
        mobile,
        url,
        address
    });

    if (user) {
        res.status(201).json({
            
            _id: user._id,
            status:user.status,
            name: user.name,
            email: user.email,
            role: user.role,
            mobile: user.mobile,
        message: "Registered",
        result_flag:1,


            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({
            message:"Failed to create the user",
            result_flag:0,
        });;
        throw new Error("Failed to create the user");
    }
});

module.exports = { registerUser };
