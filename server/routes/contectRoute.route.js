const { createEnquiry, getallEnquiry, getEnquiry, updateEnquiry, deleteEnquiry } = require('../controllers/contantCrtl.controller');

const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');


const contectRouter=require('express').Router();

//post
contectRouter.post('/', createEnquiry);
//get
contectRouter.get('/',authMiddleware,isAdmin,getallEnquiry);
contectRouter.get('/:id',authMiddleware,isAdmin,getEnquiry);

//put

contectRouter.put('/:id',authMiddleware,isAdmin,updateEnquiry)
//delete
contectRouter.delete('/:id',authMiddleware,isAdmin,deleteEnquiry);
module.exports=contectRouter;