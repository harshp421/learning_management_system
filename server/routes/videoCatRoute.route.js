const {  PostVideoCategory, GetAllVideo, GetAVideo, UpdateAVideoCategory, DeleteAVideoCategory } = require("../controllers/videoCatCrtl.controller");

const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdminMiddleware");

const videoCatRouter=require("express").Router();

//post request
videoCatRouter.post('/',authMiddleware,isAdmin,PostVideoCategory);

//get request
videoCatRouter.get('/all-category',authMiddleware,GetAllVideo);
videoCatRouter.get('/:slug',authMiddleware,GetAVideo);
// put request
videoCatRouter.put('/:id',authMiddleware,isAdmin,   UpdateAVideoCategory)

//delete request
videoCatRouter.delete('/:id',authMiddleware,isAdmin,   DeleteAVideoCategory);

module.exports=videoCatRouter;