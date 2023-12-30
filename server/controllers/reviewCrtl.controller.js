const asyncHandler=require('express-async-handler');
const Review =require('../models/reviewModal');
const User = require('../models/userModel');
const validateMongodbId = require('../config/validateMongodbId');


const createReview=asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    validateMongodbId(_id);
    try
    {
         let data={
            user:_id,
            comment:req.body.comment,
            color:req.body.color
         }
         const review =await Review.create(data);
         res.status(200).json({
            status:true,
            message:"Review Added SuccessFully...!"
         })

    }catch(error)
    {
        throw new Error(error);
    }
});


const getAllReview=asyncHandler(async(req,res)=>{
    try
    {
        const All_Review=  await Review.find().populate("user");
        res.status(200).json({
           status:true,
           message:"All Review  Fatch SuccessFully...!",
           All_Review
        })

    }catch(error)
    {
        throw new Error(error);
    }
    
})

const getAReview=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    try
    {
        const review=  await Review.findById(id).populate("user");
        res.status(200).json({
           status:true,
           message:" Review  Fatch SuccessFully...!",
           review
        })

    }catch(error)
    {
        throw new Error(error);
    }
    
})



const  deleteAReview=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try
    {
        const DeletedReview=  await Review.findByIdAndDelete(id);
        res.status(200).json({
           status:true,
           message:"Review Deleted Successfully...!",
           DeletedReview
        })

    }catch(error)
    {
        throw new Error(error);
    }
})


const  updateReviewStatus=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try
    {
        const review=  await Review.findByIdAndUpdate(id,{
            isApproved:req.body.isApproved
        },
        {
            new:true
        });
        res.status(200).json({
           status:true,
           message:"Review Updated Successfully...!",
           review
        })

    }catch(error)
    {
        throw new Error(error);
    }
})

module.exports={ createReview,getAllReview,getAReview,deleteAReview, updateReviewStatus}