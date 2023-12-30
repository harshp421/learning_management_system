const { default: slugify } = require("slugify");
const TutorialCategory =  require("../models/turorialCategoryModel");
const asyncHandler=require("express-async-handler");
const validateMongodbId = require("../config/validateMongodbId");

const PostTutorialCategory=asyncHandler(async(req,res)=>{
    try
    {
       if(req.body.title)
       {
        req.body.slug=slugify(req.body.title.toLowerCase());

       }
       const PostTutCat=await TutorialCategory.create(req.body);
       res.status(200).json(
        {
            status:true,
            message:"Turorial Categoty Created Successfully..!",
            PostTutCat
        }
       )
    }catch(error)
    {
        throw new Error(error);
    }
})

const GetAllTutorial=asyncHandler(async(req,res)=>{
     try
     {
         const All_Tutorial=  await TutorialCategory.find();
         res.status(200).json({
            status:true,
            message:"All Tutorial category Fatch SuccessFully...!",
            All_Tutorial
         })

     }catch(error)
     {
         throw new Error(error);
     }
     
})

const  GetATutorial=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try
    {
        const Single_Tutorial=  await TutorialCategory.findById(id);
        res.status(200).json({
           status:true,
           message:"Single Tutorial category Fatch SuccessFully...!",
           Single_Tutorial
        })

    }catch(error)
    {
        throw new Error(error);
    }
})


const  UpdateATutorialCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try
    { 
        if(req.body.title)
        {
         req.body.slug=slugify(req.body.title.toLowerCase());
 
        }
        const UpdatedTutorial=  await TutorialCategory.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
           status:true,
           message:"Tutorial Categoey Updated successfully...!",
           UpdatedTutorial
        })

    }catch(error)
    {
        throw new Error(error);
    }
})

const  DeleteATutorialCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try
    {
        const UpdatedTutorial=  await TutorialCategory.findByIdAndDelete(id);
        res.status(200).json({
           status:true,
           message:"Tutorial Category Deleted Successfully...!",
           UpdatedTutorial
        })

    }catch(error)
    {
        throw new Error(error);
    }
})


module.exports={
    PostTutorialCategory,
    GetAllTutorial,
    GetATutorial,
    UpdateATutorialCategory,
    DeleteATutorialCategory

}