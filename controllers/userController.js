const asyncHandler=require('express-async-handler')
const User=require("../models/userModel")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const registerUser=asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All Fields necessary");
    }
    const userAvail=await User.findOne({email});
    if(userAvail){
        res.status(400);
        throw new Error("User already registered");
    }
    const hashpass=await bcrypt.hash(password,10);
    console.log("hi");
    const user=await User.create({
        username,
        email,
        password:hashpass,
    });
    if(!user){
        res.status(400);
        throw new Error("User data not valid");
    }
    res.status(201).json({message:"User Registered"});
})

const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are necessary");
    }
    const user=await User.findOne({email});
    if(user&&(await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            }
        },process.env.ACCESS_TOKEN,
        {expiresIn:"10m"})
        res.status(200).json({accessToken});
    }
    else{
        res.status(404);
    }
})

const currentUser=asyncHandler(async (req,res)=>{
    res.status(200).json(req.user);
})

module.exports = {registerUser,loginUser,currentUser};