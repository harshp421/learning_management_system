const {
  updateCategory,
  getAllCategory,
  getOneCategory,
  deleteCategory,
  postCategory,
} = require("../controllers/projectCatCrtl.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdminMiddleware");

const projectCatRouter = require("express").Router();

projectCatRouter.post("/", authMiddleware, isAdmin, postCategory);
projectCatRouter.put("/:id", authMiddleware, isAdmin, updateCategory);
projectCatRouter.get("/:slug", authMiddleware, isAdmin, getOneCategory);
projectCatRouter.delete("/:id", authMiddleware, isAdmin, deleteCategory);
projectCatRouter.get("/", authMiddleware, isAdmin, getAllCategory);

module.exports = projectCatRouter;
