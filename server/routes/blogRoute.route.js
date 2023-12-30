const { postBlog, deleteBlog, updateABlog, getAllBlog, getABlog } = require('../controllers/blogCrtl.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

const blogRouter=require('express').Router();

blogRouter.post('/',authMiddleware,isAdmin,postBlog);
blogRouter.get('/:slug',getABlog);
blogRouter.get('/',getAllBlog);
blogRouter.delete('/:id',authMiddleware,isAdmin,deleteBlog);
blogRouter.put('/:id',authMiddleware,isAdmin,updateABlog);


module.exports=blogRouter;