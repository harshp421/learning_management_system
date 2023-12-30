const asyncHandler=require('express-async-handler');
const  NewsLetter = require('../models/newsletterModal');


const SubScribe=asyncHandler(async(req,res)=>{
  
   try
   {
     const newsLatter =  await NewsLetter.create(req.body)
    res.status(200).json({
        status:true,
        message:"SubScribe to a NewsLatter...!",
        newsLatter
    })
   }catch(error)
   {
     throw new Error(error);
   }
}) 



const UnsubScribe=asyncHandler(async(req,res)=>{
    
    const {id}=req.params;
    try
    {
     NewsLetter.findByIdAndDelete(id)
     res.status(200).json({
         status:true,
         message:"unSubScribe to a NewsLatter..!"
     })
    }catch(error)
    {
      throw new Error(error);
    }
 }) 


module.exports={SubScribe,UnsubScribe};
