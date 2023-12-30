const { default: slugify } = require("slugify");
const validateMongodbId = require("../config/validateMongodbId");
const Blog = require("../models/blogModal");
const asyncHandler = require("express-async-handler");

//post a Blog
const postBlog = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }

    const blog = await Blog.create(req.body);
    res.status(200).json({
      status: true,
      message: " Blog posted  SuccessFully...!",
      blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get a Blog

const getABlog = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const blog = await Blog.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: " single Blog fatch SuccessFully...!",
      blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// get all Blogs
const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const allBlog = await Blog.find();
    res.status(200).json({
      status: true,
      message: "all Blog fatch SuccessFully...!",
      allBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const blog = await Blog.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: " Blog Deleted SuccessFully...!",
      blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateABlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: true,
      message: " Blog Updated  SuccessFully...!",
      updatedBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { postBlog, deleteBlog, getABlog, getAllBlog, updateABlog };
