const { default: slugify } = require("slugify");

const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongodbId");
const DocCat = require("../models/docCatModal");
const BlogCat = require("../models/blogCatModal");

const PostBlogCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const PostBlogCat = await BlogCat.create(req.body);

    res.status(200).json({
      status: true,
      message: "Blog Category Created Successfully..!",
      PostBlogCat,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const GetAllBlog = asyncHandler(async (req, res) => {
  try {
    const All_Blog = await BlogCat.find();
    res.status(200).json({
      status: true,
      message: "All Blog category Fatch SuccessFully...!",
      All_Blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const GetABlog = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  try {
    const Single_Blog = await BlogCat.findOne({ slug: slug });
    res.status(200).json({
      status: true,
      message: "Single Blog category  Fatch SuccessFully...!",
      Single_Blog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const UpdateBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const upatedBlog = await BlogCat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Document Categoey Updated successfully...!",
      upatedBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const DeleteABlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const deletedDocument = await BlogCat.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Blog Category Deleted Successfully...!",
      deletedDocument,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  PostBlogCategory,
  GetAllBlog,
  GetABlog,
  UpdateBlogCategory,
  DeleteABlogCategory,
};
