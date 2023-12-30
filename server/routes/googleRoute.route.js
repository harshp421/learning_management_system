const googleRoute=require('express').Router();
const passport =require('passport');
const generateToken= require('../config/jwtToken');
const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');

googleRoute.get("/login/success",expressAsyncHandler(async(req,res)=>{
    console.log("success");
    if(req.user)
    {
        const findUser=await User.findOne({email:req.user.email})
        if(findUser)
        {
            res.status(200).json({
                status:true,
                message:'Login Successfully!',
                token:generateToken(findUser?._id),
                role:findUser?.roles,
                username:findUser?.firstname +" "+ findUser?.lastname,
                user_image:findUser?.user_image,
                from:"google"
              })
        }
    }
    else
    {
        throw new Error("Something went wrong ...!")
    }
   
}))



googleRoute.get("/login/failed",expressAsyncHandler(async(req,res)=>{
  res.status(401).json({
    status:false,
    message:"Login Faild"
  })
}))


googleRoute.get("/google",
 passport.authenticate("google", { scope:
    [ 'email', 'profile' ] })
)


googleRoute.get("/auth/google/callback", 
passport.authenticate("google",{
        successRedirect:"/login/success",
        failureRedirect:"/login/failed"
  
    
}))


googleRoute.get("/logout",expressAsyncHandler(async(req,res)=>{
   req.logOut();
   res.redirect("/");
}))


module.exports=googleRoute;