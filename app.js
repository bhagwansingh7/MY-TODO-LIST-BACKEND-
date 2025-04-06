const express=require('express');
const env=require('dotenv')
env.config()
const connectDB=require('./src/config/db');
connectDB();
const user=require('./src/models/user')
const app=express();
app.get('/',(req,res)=>{
    app.send("hey there")
})
app.listen(3000,()=>{
    console.log("this is running on port 3000")
})