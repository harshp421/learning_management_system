const { createReview, getAllReview, getAReview, updateReviewStatus, deleteAReview } = require('../controllers/reviewCrtl.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');


const reviewRouter=require('express').Router();

//post
reviewRouter.post('/',authMiddleware, createReview);
//get
reviewRouter.get('/',getAllReview);
reviewRouter.get('/:id',authMiddleware,isAdmin,getAReview);

//put

reviewRouter.put('/:id',authMiddleware,isAdmin,updateReviewStatus)
//delete
reviewRouter.delete('/:id',authMiddleware,isAdmin,deleteAReview);
module.exports=reviewRouter;