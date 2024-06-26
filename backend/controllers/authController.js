const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Authentication successful, generate a token and send a response
      const token = generateToken(user._id);
      res.status(200).json({
        _id: user._id,
        message: "Login Successfully",
        result_flag: 1,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } else {
      // Authentication failed, send an error response
      res
        .status(401)
        .json({ message: "Invalid Email or Password", result_flag: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", result_flag: 0 });
  }
};

module.exports = { authUser };
