const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const multer = require("multer");

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

const getUser=async(req,res)=>{
  const { email } = req.body;


  try{
  const user=await User.findOne({email:email})

  if(!user){
    res
      .status(400)
      .json({message: "User not found",result_flag:0})
  }

  res.status(200).json({
     _id: user._id,
        message: "User Details Fetched",
        result_flag: 1,
        name: user.name,
        email: user.email,
        role: user.role,
        url:user.url,
        address:user.address,
        mobile:user.mobile,
  })

  }catch(error){
res.status(500).json({ message: "Server Error", result_flag: 0 });
  }
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  },
});

const uploadUser = multer({ storage });

const updateUserItem = async (req, res) => {
  try {
    const { name,
      address,
      mobile,
      email
      } = req.body;
    const file = req.file;

    // if (!file) {
    //   return res
    //     .status(400)
    //     .json({ message: "No file uploaded", result_flag: 0 });
    // }

const user=await User.findOne({email})
if(name){
  user.name=name

}
if(address){
  user.address=address
}
if(mobile){
  user.mobile=mobile
}
if(file.path){
  user.url=file.path.replace(/\\/g, "/")
}

await user.save()

    


    res.status(200).json({
      message: "User Updated",
      result_flag: 1,
      item: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", result_flag: 0 });
  }
};

module.exports = { authUser,getUser,uploadUser,updateUserItem };
