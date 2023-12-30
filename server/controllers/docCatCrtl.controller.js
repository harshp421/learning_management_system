const { default: slugify } = require("slugify");

const asyncHandler=require("express-async-handler");
const validateMongodbId = require("../config/validateMongodbId");
const DocCat = require('../models/docCatModal')
const PostDocumentCategory=asyncHandler(async(req,res)=>{
    try
    { 
        if(req.body.title)
        {
         req.body.slug=slugify(req.body.title.toLowerCase());
        }
       const PostTutCat=await DocCat.create(req.body);
       res.status(200).json(
        {
            status:true,
            message:"Documents Categoty Created Successfully..!",
            PostTutCat
        }
       )
    }catch(error)
    {
        throw new Error(error);
    }
})

const GetAllDocument=asyncHandler(async(req,res)=>{
     try
     {
         const All_Document=  await DocCat.find();
         res.status(200).json({
            status:true,
            message:"All Document category Fatch SuccessFully...!",
            All_Document
         })

     }catch(error)
     {
         throw new Error(error);
     }
     
})

const  GetADocument=asyncHandler(async(req,res)=>{
    const {slug}=req.params;
  

    try
    {
        const Single_Document=  await DocCat.findOne({slug:slug});
        res.status(200).json({
           status:true,
           message:"Single Document category Fatch SuccessFully...!",
           Single_Document
        })

    }catch(error)
    {
        throw new Error(error);
    }
})


const  UpdateADocumentCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try
    {  
        if(req.body.title)
        {
         req.body.slug=slugify(req.body.title.toLowerCase());
        }
        const DeletedDocument=  await DocCat.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
           status:true,
           message:"Document Categoey Updated successfully...!",
           DeletedDocument
        })

    }catch(error)
    {
        throw new Error(error);
    }
})

const  DeleteADocumentCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);

    try
    {
        const UpdatedDocument=  await DocCat.findByIdAndDelete(id);
        res.status(200).json({
           status:true,
           message:"Document Category Deleted Successfully...!",
           UpdatedDocument
        })

    }catch(error)
    {
        throw new Error(error);
    }
})


module.exports={
    PostDocumentCategory,
    GetAllDocument,
    GetADocument,
    UpdateADocumentCategory,
    DeleteADocumentCategory

}