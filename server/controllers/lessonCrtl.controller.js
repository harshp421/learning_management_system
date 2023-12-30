const asyncHandler=require('express-async-handler');
const Cource = require('../models/courceModal');
const { default: slugify } = require('slugify');
const Lesson = require('../models/lessonModal');
const validateMongodbId = require('../config/validateMongodbId');




const createAlesson=asyncHandler(async(req,res)=>{
    const {courceID}=req.params;

     try
    { 
   const findCource=await Cource.findById(courceID);
   if(findCource)
   {
   if(req.body.title)
   {
    req.body.slug=slugify(req.body.title.toLowerCase());
   }
   const lesson=await Lesson.create(req.body);
   await Cource.findByIdAndUpdate(courceID,{$push:{lessons:lesson._id}},{new:true});

   res.status(200).json({
    status:true,
    message:"Lessson Added to the couce",
    findCource,
    lesson
   })
   }else
   {
    throw new Error("Thair is no cource with this id")
   }
    }catch(error)
    {
       throw new Error(error)
    }  
})


const deleteALesson=asyncHandler(async(req,res)=>{
const {courceId,lessonId}=req.params;
    try
    {
     
        const findCource=await Cource.findByIdAndUpdate(courceId,{$pull:{lessons:lessonId}},{new:true});
        const findLesson=await Lesson.findByIdAndDelete(lessonId);
        res.status(200).json({
            status:true,
            message:"Lesson deleted Successfully ",
            findLesson,
            findCource
        })
    }catch(error)
    {
        throw new Error(error)
    }
})



const getALesson= asyncHandler(async(req,res)=>{
    const {lessonId}=req.params;
    validateMongodbId(lessonId);
    try
    {
     const lesson=await Lesson.find({_id:lessonId});
     res.status(200).json({
         status:true,
          message:"Lesson Found ..!",
          lesson
     })
    }catch(error)
    {
        throw new Error(error)
    }
})

const  getAllCourceLesson=asyncHandler(async(req,res)=>{
    const {courceId}=req.params;
    validateMongodbId(courceId);
    try
    {
     const lesson=await Cource.find().where({_id:courceId}).select("lessons")
     res.status(200).json({
         status:true,
          message:"Lessons Found ..!",
          lesson
     })
    }catch(error)
    {
        throw new Error(error)
    }
})

const updateLession=asyncHandler(async(req,res)=>{
    const {lessonId}=req.params;
    validateMongodbId(lessonId);
    try
    {
        if(req.body.title)
        {
         req.body.slug=slugify(req.body.title.toLowerCase());
        }
     const lesson=await Lesson.findByIdAndUpdate(lessonId,req.body,{new:true})
     res.status(200).json({
         status:true,
          message:"Lesson Updated..!",
          lesson
     })
    }catch(error)
    {
        throw new Error(error)
    }
})
module.exports={createAlesson,deleteALesson, getALesson,getAllCourceLesson,updateLession}