const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"username is required"],
        trim:true
    },
})
const User=mongoose.model('User',userSchema)
module.exports=User