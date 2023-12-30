const { PostTutorialCategory, GetAllTutorial, GetATutorial, UpdateATutorialCategory, DeleteATutorialCategory } = require("../controllers/tutorialCategoryCrtl.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdminMiddleware");

const TutorialCategoryRoute=require("express").Router();

//post request
TutorialCategoryRoute.post('/post',authMiddleware,isAdmin,PostTutorialCategory);

//get request
TutorialCategoryRoute.get('/',authMiddleware,GetAllTutorial);
TutorialCategoryRoute.get('/:id',authMiddleware,GetATutorial);
// put request
TutorialCategoryRoute.put('/:id',authMiddleware,isAdmin,UpdateATutorialCategory)

//delete request
TutorialCategoryRoute.delete('/:id',authMiddleware,isAdmin,DeleteATutorialCategory)
module.exports=TutorialCategoryRoute;