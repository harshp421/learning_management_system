const { UpdateBlogCategory, DeleteABlogCategory, GetABlog, GetAllBlog, PostBlogCategory } = require("../controllers/blogCatCrtl.controller");

const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdminMiddleware");

const blogCatRouter=require("express").Router();

//post request
blogCatRouter.post('/',authMiddleware,isAdmin,PostBlogCategory);

//get request
blogCatRouter.get('/all-category',authMiddleware,GetAllBlog);
blogCatRouter.get('/:slug',authMiddleware,GetABlog);
// put request
blogCatRouter.put('/:id',authMiddleware,isAdmin,  UpdateBlogCategory)

//delete request
blogCatRouter.delete('/:id',authMiddleware,isAdmin, DeleteABlogCategory);

module.exports=blogCatRouter;