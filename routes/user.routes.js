const express=require("express");
require("dotenv").config();

const userRouter=express.Router();
const bcrypt=require("bcrypt");
const {UserModel}=require("../models/user.model");
const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
    //logic
    const {name,email,pass}=req.body;
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.json({error:err.message})
            }else{
                const user=new UserModel({name,email,pass:hash})
                await user.save()
            }
        })

        res.json({msg:"user hsas been registered",user:req.body})
    }catch(err){
        res.json({error:err.message})

    }
    
})

userRouter.post("/login",async(req,res)=>{

    //logic
    const {email,pass}=req.body;
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user._id,user:user.name},process.env.secret)
                    res.json({msg:"logged in",token})
                }else{
                    res.json({error:"wrong credentials"})
                }
            })
        }else{
            res.json({msg:"user doesnot exist"})
        }
    }
    catch(err){
        res.json({error:err.message})
    }

})

module.exports={
    userRouter
}