const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        url: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
        role: { type: String, required: false },
        mobile:{type:String,required:true,unique:true},
        status:{type:String},
        address:{type:String},

    },
    {
        timestamps: true,
    }
);

userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    // const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("User", userModel);

module.exports = User;
