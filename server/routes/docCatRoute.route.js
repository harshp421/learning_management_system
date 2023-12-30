const {  PostDocumentCategory,
   
    GetADocument,
    UpdateADocumentCategory,
    DeleteADocumentCategory,
    GetAllDocument} = require("../controllers/docCatCrtl.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdminMiddleware");

const docCatRouter=require("express").Router();

//post request
docCatRouter.post('/',authMiddleware,isAdmin,PostDocumentCategory);

//get request
docCatRouter.get('/all-category',authMiddleware,GetAllDocument);
docCatRouter.get('/:slug',authMiddleware,GetADocument);
// put request
docCatRouter.put('/:id',authMiddleware,isAdmin,UpdateADocumentCategory)

//delete request
docCatRouter.delete('/:id',authMiddleware,isAdmin,DeleteADocumentCategory);

module.exports=docCatRouter;