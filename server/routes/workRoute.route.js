
const { postDetaile, updateDetails, deleteDetails, getOneDetails, getAllDetaile } = require('../controllers/workWithUsCrtl.controller');

const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

const workRouter=require('express').Router();

workRouter.post('/',authMiddleware,isAdmin, postDetaile);
workRouter.put('/:id',authMiddleware,isAdmin,updateDetails);
 workRouter.get('/:slug',authMiddleware,isAdmin,getOneDetails);
 workRouter.delete('/:id',authMiddleware,isAdmin,deleteDetails);
 workRouter.get('/',authMiddleware,isAdmin,getAllDetaile);


module.exports=workRouter;