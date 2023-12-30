const {  PostCourceCategory, GetAllCource, GetACource, UpdateACourceCategory, DeleteACourceCategory } = require("../controllers/courceCatCrtl.controller");

const authMiddleware = require("../middlewares/authMiddleware");
const isBothMiddleware = require("../middlewares/isBothMiddleware");

const CourceCatRouter=require("express").Router();

//post request
CourceCatRouter.post('/',authMiddleware,isBothMiddleware,PostCourceCategory);

//get request
CourceCatRouter.get('/all-category',authMiddleware,GetAllCource);
CourceCatRouter.get('/:slug',authMiddleware,GetACource);
// put request
CourceCatRouter.put('/:id',authMiddleware,isBothMiddleware,   UpdateACourceCategory)

//delete request
CourceCatRouter.delete('/:id',authMiddleware,isBothMiddleware,   DeleteACourceCategory);

module.exports=CourceCatRouter;