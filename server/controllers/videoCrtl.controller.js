const { default: slugify } = require('slugify');
const validateMongodbId = require('../config/validateMongodbId');
const Video = require('../models/videoModal');
const asyncHandler=require('express-async-handler');


//post a video
const postVideo=asyncHandler(async(req,res)=>{
    
    try
    { 
        if(req.body.title)
        {
         req.body.slug=slugify(req.body.title.toLowerCase());
 
        }

      const video=await Video.create(req.body);
      res.status(200).json({
        status:true,
        message:" video posted  SuccessFully...!",
         video
     })
    }catch(error)
    {
        throw new Error(error);
    }
})

// get a video

const getAvideo=asyncHandler(async(req,res)=>{
    const {slug}=req.params;
    try
    {  const video=await Video.findOne({slug:slug});
        res.status(200).json({
          status:true,
          message:" single video fatch SuccessFully...!",
           video
       })
      
    }catch(error)
    {
      throw new Error(error);
    }
})

// get all videos
const getAllvideo=asyncHandler(async(req,res)=>{
   
    try
    {  const video=await Video.find();
        res.status(200).json({
          status:true,
          message:" video posted  SuccessFully...!",
           video
       })
      
    }catch(error)
    {
      throw new Error(error);
    }
})


const  deleteVideo=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try
    {  const video=await Video.findByIdAndDelete(id);
        res.status(200).json({
          status:true,
          message:" video Deleted SuccessFully...!",
           video
       })
      
    }catch(error)
    {
      throw new Error(error);
    }
})

const updateAvideo=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try

    { 
      if(req.body.title)
      {
       req.body.slug=slugify(req.body.title.toLowerCase());

      }
      
      const video=await Video.findByIdAndUpdate(id,req.body,{new:true});
     
      res.status(200).json({
          status:true,
          message:" video Updated  SuccessFully...!",
           video
       })
      
    }catch(error)
    {
      throw new Error(error);
    }
})


module.exports={ postVideo,deleteVideo,getAvideo,getAllvideo,updateAvideo}