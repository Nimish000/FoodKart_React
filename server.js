const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');

// const { chats } = require("./backend/data/data");
const connectDB = require("./backend/config/db");

const userRoutes = require("./backend/routes/userRoutes");
const {notFound, errorHandler  }=require('./backend/middleware/errorMiddleware')

connectDB();
const app= express();
dotenv.config();

app.use(express.json()); //to accept jsoon data

app.get('/',(req,res)=>{
    res.send("Api is Running");
})

// app.get('/api/chats',(req,res)=>{
//     res.send(chats);
// })
// app.get('/api/chats/:id',(req, res)=>{
//     console.log(req.params.id);
//     const singleChat = chats.find((c)=>c._id === req.params.id);
//     res.send(singleChat);
// })

app.use('/api/',userRoutes);
// Serve the uploads directory as a static path
app.use('/uploads', express.static('uploads'));
app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`Server Started on port ${PORT}`));

