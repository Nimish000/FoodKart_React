const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () =>{
    try{
        
        const MONGO_URI=process.env.MONGODB_URI;
        const conn = await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log('Connected to MongoDB');
        }).catch((error) => {
            console.error('Error connecting to MongoDB', error);
        });
        

        // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

    } catch(error) {
        console.log(`Error: ${error.message}`.red);
        process.exit();
    }
};

module.exports=connectDB;