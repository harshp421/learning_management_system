const asyncHandler = require("express-async-handler");
const Work = require("../models/workWithUsModal");
const { createOne, updateOne ,deleteOne,GetOne, GetAll} = require("./customeCrtl.controller");


const postDetaile=createOne(Work);
const updateDetails=updateOne(Work);
const deleteDetails=deleteOne(Work);
const getOneDetails=GetOne(Work);
const getAllDetaile=GetAll(Work);
module.exports={postDetaile,updateDetails,deleteDetails,getOneDetails, getAllDetaile}