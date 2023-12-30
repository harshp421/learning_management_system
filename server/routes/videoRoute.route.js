const { getAllReview } = require('../controllers/reviewCrtl.controller');
const { postVideo, getAvideo, deleteVideo, getAllvideo, updateAvideo } = require('../controllers/videoCrtl.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

const videoRouter=require('express').Router();

videoRouter.post('/',authMiddleware,isAdmin,postVideo);
videoRouter.get('/:slug',getAvideo);
videoRouter.get('/',getAllvideo);
videoRouter.delete('/:id',authMiddleware,isAdmin,deleteVideo);
videoRouter.put('/:id',authMiddleware,isAdmin,updateAvideo);


module.exports=videoRouter;