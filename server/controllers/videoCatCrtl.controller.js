const { default: slugify } = require("slugify");

const asyncHandler=require("express-async-handler");
const validateMongodbId = require("../config/validateMongodbId");
const VideoCat=require('../models/videoCatModal')

const PostVideoCategory=asyncHandler(async(req,res)=>{
    try
    { 
        if(req.body.title)
        {
         req.body.slug=slugify(req.body.title.toLowerCase());
        }
       const PostVideoCat=await  VideoCat.create(req.body);
       res.status(200).json(
        {
            status:true,
            message:"Videos Categoty Created Successfully..!",
            PostVideoCat
        }
       )
    }catch(error)
    {
        throw new Error(error);
    }
})

const GetAllVideo=asyncHandler(async(req,res)=>{
     try
     {
         const All_Video=  await  VideoCat.find();
         res.status(200).json({
            status:true,
            message:"All Video category Fatch SuccessFully...!",
            All_Video
         })

     }catch(error)
     {
         throw new Error(error);
     }
     
})

const  GetAVideo=asyncHandler(async(req,res)=>{
    const {slug}=req.params;
  

    try
    {
        const Single_Video=  await  VideoCat.findOne({slug:slug});
        res.status(200).json({
           status:true,
           message:"Single Video category Fatch SuccessFully...!",
           Single_Video
        })

    }catch(error)
    {
        throw new Error(error);
    }
})


const  UpdateAVideoCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try
    {  
        if(req.body.title)
        {
         req.body.slug=slugify(req.body.title.toLowerCase());
        }
        const DeletedVideo=  await  VideoCat.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
           status:true,
           message:"Video Categoey Updated successfully...!",
           DeletedVideo
        })

    }catch(error)
    {
        throw new Error(error);
    }
})

const  DeleteAVideoCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try
    {
        const UpdatedVideo=  await VideoCat.findByIdAndDelete(id);
        res.status(200).json({
           status:true,
           message:"Video Category Deleted Successfully...!",
           UpdatedVideo
        })

    }catch(error)
    {
        throw new Error(error);
    }
})


module.exports={
    PostVideoCategory,
    GetAllVideo,
    GetAVideo,
    UpdateAVideoCategory,
    DeleteAVideoCategory

}