const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongodbId");
const { default: slugify } = require("slugify");
const Cource = require("../models/courceModal");

//creating a cource
const creatACource = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (_id) {
      req.body.instructor = _id;
    }
    const cource = await Cource.create(req.body);

    res.status(200).json({
      status: true,
      message: "Cource Uploaded SuccessFully ...!",
      cource,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//updating a  cource
const updatingCource = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }

    const updatedCource = await Cource.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: true,
      message: " Cource  Updated  SuccessFully...!",
      updatedCource,
    });
  } catch (error) {
    throw new Error(error);
  }
});
// get single cource
const getACource = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const singleCource = await Cource.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: " single Cource fatch SuccessFully...!",
      singleCource,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//get all cource

const getAllCources = asyncHandler(async (req, res) => {
  try {
    const allCources = await Cource.find();
    res.status(200).json({
      status: true,
      message: "All Cource Fatch Successfully...!",
      allCources,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCourcesByCategory = asyncHandler(async (req, res) => {
  const { type } = req.params;
  try {
    const allCources = await Cource.find({ category: type });
    res.status(200).json({
      status: true,
      message: "All Cource by category  Fatch Successfully...!",
      allCources,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getCourcebyspecificInstutore = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const allCources = await Cource.find({ instructor: _id });
    res.status(200).json({
      status: true,
      message: "All Cource by specific instutore fatch Fatch Successfully...!",
      allCources,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//deleting a cource
const deleteCource = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const video = await Cource.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: " Cource Deleted SuccessFully...!",
      video,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  creatACource,
  getAllCourcesByCategory,
  deleteCource,
  updatingCource,
  getCourcebyspecificInstutore,
  getAllCources,
  getACource,
};
