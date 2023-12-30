const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../config/validateMongodbId");
const { query } = require("express");
const APIFeature = require("../utils/ApiFeatures");
const { default: slugify } = require("slugify");
const createOne = (Model) => {
  return asyncHandler(async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const data = await Model.create(req.body);
      res.status(200).json({
        status: true,
        message: "created SuccessFully ...!",
      });
    } catch (error) {
      throw new Error(error);
    }
  });
};
const updateOne = (Model) => {
  return asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const data = await Model.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({
        status: true,
        message: "Updated SuccessFully ...!",
      });
    } catch (error) {
      throw new Error(error);
    }
  });
};

const deleteOne = (Model) => {
  return asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const data = await Model.findByIdAndDelete(id, req.body, { new: true });
      res.status(200).json({
        status: true,
        message: "Deleted SuccessFully ...!",
      });
    } catch (error) {
      throw new Error(error);
    }
  });
};

const GetOne = (Model, populateOption) => {
  return asyncHandler(async (req, res) => {
    console.log(req.params);
    const { id, slug } = req.params;
    if (id) {
      validateMongodbId(id);
    }
    try {
      let query;
      if (id) {
        query = Model.findById(id);
      }
      if (slug) {
        query = Model.findOne({ title: slug });
      }
      if (populateOption) {
        query = query.populate(populateOption);
      }

      const data = await query;

      if (!data) {
        throw new Error("No Data Found With This Id");
      }
      res.status(200).json({
        status: true,
        message: "One Fateched SuccessFully ...!",
        data,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
};

const GetAll = (Model) => {
  return asyncHandler(async (req, res) => {
    try {
      let filter = {};
      const features = new APIFeature(Model.find(filter), req.query)
        .filter()
        .sort()
        .limit()
        .pagination();

      const data = await features.query;
      res.status(200).json({
        status: true,
        message: "Data Fateched SuccessFully ...!",
        data,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
};
module.exports = { createOne, updateOne, deleteOne, GetOne, GetAll };
