const { default: slugify } = require("slugify");

const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongodbId");
const CourceCat = require("../models/CourceCatModal");

const PostCourceCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const PostCourceCat = await CourceCat.create(req.body);
    res.status(200).json({
      status: true,
      message: "Cources Categoty Created Successfully..!",
      PostCourceCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const GetAllCource = asyncHandler(async (req, res) => {
  try {
    const All_Cource = await CourceCat.find();
    res.status(200).json({
      status: true,
      message: "All Cource category Fatch SuccessFully...!",
      All_Cource,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const GetACource = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const Single_Cource = await CourceCat.findOne({ title: slug });
    res.status(200).json({
      status: true,
      message: "Single Cource category Fatch SuccessFully...!",
      Single_Cource,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const UpdateACourceCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const DeletedCource = await CourceCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Cource Categoey Updated successfully...!",
      DeletedCource,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const DeleteACourceCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const UpdatedCource = await CourceCat.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Cource Category Deleted Successfully...!",
      UpdatedCource,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  PostCourceCategory,
  GetAllCource,
  GetACource,
  UpdateACourceCategory,
  DeleteACourceCategory,
};
