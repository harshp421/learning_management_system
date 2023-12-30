const { default: slugify } = require('slugify');
const validateMongodbId = require('../config/validateMongodbId');

const Documentation=require('../models/documentationModal')
const asyncHandler=require('express-async-handler');


//post a Documentation
const postDoc=asyncHandler(async(req,res)=>{
    
    try
    { 
        if(req.body.title)
        {
         req.body.slug=slugify(req.body.title.toLowerCase());
 
        }

      const documentation=await Documentation.create(req.body);
      res.status(200).json({
        status:true,
        message:" Documentation posted  SuccessFully...!",
         documentation
     })
    }catch(error)
    {
        throw new Error(error);
    }
})

// get a Documentation

const getADoc=asyncHandler(async(req,res)=>{
    const {slug}=req.params;
    try
    {  const singleDoc=await Documentation.findOne({slug:slug})
        res.status(200).json({
          status:true,
          message:" single Documentation fatch SuccessFully...!",
          singleDoc
       })
      
    }catch(error)
    {
      throw new Error(error);
    }
})

// get all Documentations
const getAllDoc=asyncHandler(async(req,res)=>{
   
    try
    {  const doc=await Documentation.find();
        res.status(200).json({
          status:true,
          message:" all  Documentation SuccessFully...!",
           doc
       })
      
    }catch(error)
    {
      throw new Error(error);
    }
})


const  deleteDoc=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try
    {  const deleted_doc=await Documentation.findByIdAndDelete(id);
        res.status(200).json({
          status:true,
          message:" Documentation Deleted SuccessFully...!",
          deleted_doc
       })
      
    }catch(error)
    {
      throw new Error(error);
    }
})

const updateADoc=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try

    { 
      if(req.body.title)
      {
       req.body.slug=slugify(req.body.title.toLowerCase());

      }
      
      const update_doc=await Documentation.findByIdAndUpdate(id,req.body,{new:true});
     
      res.status(200).json({
          status:true,
          message:" Documentation Updated  SuccessFully...!",
          update_doc
       })
      
    }catch(error)
    {
      throw new Error(error);
    }
})


module.exports={ postDoc,deleteDoc,getADoc,getAllDoc,updateADoc}