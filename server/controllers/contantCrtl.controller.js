const validateMongodbId = require("../config/validateMongodbId");

const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModal");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Contact.create(req.body);
    res.status(200).json({
      status: true,
      message: " Enquiry Submited  SuccessFully...!",
      newEnquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatedEnquiry = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "  Enquiry Updated SuccessFully...!",
      updatedEnquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletedEnquiry = await Contact.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: " Enquiry Deleted SuccessFully...!",
      deletedEnquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaEnquiry = await Contact.findById(id);
    res.status(200).json({
      status: true,
      message: " Enquiry Fatch SuccessFully...!",
      getaEnquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getallEnquiry = asyncHandler(async (req, res) => {
  try {
    const getallEnquiry = await Contact.find();
    res.status(200).json({
      status: true,
      message: " all Enquiry Fatch SuccessFully...!",
      getallEnquiry,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
};
