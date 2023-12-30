
const { postDoc,deleteDoc,getADoc,getAllDoc,updateADoc } = require('../controllers/docCtrl.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

const documentationRouter=require('express').Router();

documentationRouter.post('/',authMiddleware,isAdmin,postDoc);
documentationRouter.get('/:slug',getADoc);
documentationRouter.get('/',getAllDoc);
documentationRouter.delete('/:id',authMiddleware,isAdmin,deleteDoc);
documentationRouter.put('/:id',authMiddleware,isAdmin,updateADoc);


module.exports=documentationRouter;