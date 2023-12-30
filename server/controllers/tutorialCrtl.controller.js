const { default: slugify } = require("slugify");

const asyncHandler=require("express-async-handler");
const validateMongodbId = require("../config/validateMongodbId");
const Tutorial=require('../models/tutorialModal');
const postTutorial=asyncHandler(async(req,res)=>{
    try
    {
       if(req.body.title)
       {
        req.body.slug=slugify(req.body.title.toLowerCase());

       }
    if(req.body.tutorialCategory)
    {
        req.body.tutorialCategorySlug=slugify(req.body.tutorialCategory.toLowerCase());

    }
       const PostTutorial=await Tutorial.create(req.body);
       res.status(200).json(
        {
            status:true,
            message:"Turorial Created Successfully..!",
            PostTutorial
        }
       )
    }catch(error)
    {
        throw new Error(error);
    }
})

const  GetATutorial=asyncHandler(async(req,res)=>{
    const {slug,type}=req.params;
   
 try
    {
        const Single_Tutorial_data=  await Tutorial.findOne({
            slug:slug,
            tutorialCategorySlug:type
        });
        const tutorialTopics=await Tutorial.find({
            tutorialCategorySlug:type
        }).select("topicName title slug tutorialCategorySlug").sort("createdAt")
        res.status(200).json({
           status:true,
           message:"data  Fatch SuccessFully...!",
           Single_Tutorial_data,
           tutorialTopics
        })

    }catch(error)
    {
        throw new Error(error);
    }
})


const GetAllTutorial=asyncHandler(async(req,res)=>{
    try
    {
        const All_Tutorial=  await Tutorial.find();
        res.status(200).json({
           status:true,
           message:"All Tutorial  Fatch SuccessFully...!",
           All_Tutorial
        })

    }catch(error)
    {
        throw new Error(error);
    }
    
})


//update tutoril
const  UpdateTutorial=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try
    { 
        if(req.body.title)
        {
         req.body.slug=slugify(req.body.title.toLowerCase());
 
        }
        if(req.body.tutorialCategory)
        {
            req.body.tutorialCategorySlug=slugify(req.body.tutorialCategory.toLowerCase());
    
        }
        const UpdatedTutorial=  await Tutorial.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
           status:true,
           message:"Tutorial  Updated successfully...!",
           UpdatedTutorial
        })

    }catch(error)
    {
        throw new Error(error);
    }
})

const  DeleteATutorial=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try
    {
        const DeletedTutorial=  await Tutorial.findByIdAndDelete(id);
        res.status(200).json({
           status:true,
           message:"Tutorial  Deleted Successfully...!",
           DeletedTutorial
        })

    }catch(error)
    {
        throw new Error(error);
    }
})


module.exports={
    postTutorial,
    GetATutorial,
    UpdateTutorial,
    DeleteATutorial,
    GetAllTutorial
   

}