const { postTutorial, GetATutorial, UpdateTutorial, DeleteATutorial, GetAllTutorial } = require('../controllers/tutorialCrtl.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

const tutorialRoute=require('express').Router();

//post
tutorialRoute.post('/',authMiddleware,isAdmin,postTutorial);
//get
tutorialRoute.get('/:type/:slug',authMiddleware,GetATutorial);
tutorialRoute.get('/',authMiddleware,GetAllTutorial)
//put
tutorialRoute.put('/:id',authMiddleware,isAdmin,UpdateTutorial);
//delete
tutorialRoute.delete('/:id',authMiddleware,isAdmin,DeleteATutorial)
module.exports=tutorialRoute; 