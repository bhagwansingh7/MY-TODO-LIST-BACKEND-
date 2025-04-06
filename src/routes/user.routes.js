const express=require('express');
const { model } = require('mongoose');
const router=express.Router();    
const bcrypt=require('bcrypt');     
const jwt=require('jsonwebtoken');  
const userModel=require('../models/user')
const {body,validationResult}=require('express-validator')

router.get('/register',(req,res)=>{
    res.render("register");
})
router.post('/register',    [
        body('username')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 characters long'),
    
    body('email').trim()
        .isEmail()
        .withMessage('Invalid email format'),
    
    body('password').trim()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
    ],
    async (req,res)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:'invalid data'
            })
        }
       const{username,email,password}=req.body
       const hashPassword=await bcrypt.hash(password,10) //10 for rounding of hashing
       const newUser=await userModel.create({
        username,
        email,
        password:hashPassword
        
       })
       res.send(newUser)
})


router.get('/login',(req,res)=>{
    res.render("login");
})
router.post('/login',
   body('username').trim().isLength({min:3}) ,
  
   body('password').trim().isLength({min:8}),
    async(req,res)=>{
    const errors=validationResult(req)
        if(!errors.isEmpty){
        return res.status(400).json({
        errors:errors.array(),
        message:'Invalid Data'
        })
    }

        const{username,password}=req.body
        const user=await userModel.findOne({
            username:username
        })
        if(!user){
            return res.status(400).json({
                message:"username or password is incorrect"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"username or password is incorrect"
            })
        }
        const token=jwt.sign({
            userId:user._id,
            email:user.email,
            password:user.password

        },
        process.env.JWT_SECRET,
       )
  
       res.cookie('token',token)
       res.json("logged in")
        
});

module.exports=router