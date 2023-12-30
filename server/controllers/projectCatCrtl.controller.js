const asyncHandler = require("express-async-handler");
const ProjectCategory= require("../models/projectCatModal");
const { createOne, updateOne ,deleteOne,GetOne, GetAll} = require("./customeCrtl.controller");


const postCategory=createOne(ProjectCategory);
const updateCategory=updateOne(ProjectCategory);
const deleteCategory=deleteOne(ProjectCategory);
const getOneCategory=GetOne(ProjectCategory);
const getAllCategory=GetAll(ProjectCategory);
module.exports={postCategory,updateCategory,deleteCategory,getOneCategory, getAllCategory}