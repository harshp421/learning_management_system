const { creatACource, getAllCources, getACource, updatingCource, deleteCource, getCourcebyspecificInstutore, getAllCourcesByCategory } = require('../controllers/CourceCrtl.controller');
const { createAlesson, deleteALesson, getALesson, getAllCourceLesson, updateLession } = require('../controllers/lessonCrtl.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const isBothMiddleware = require('../middlewares/isBothMiddleware');

const courceRouter=require('express').Router();



courceRouter.post('/',authMiddleware,isBothMiddleware,creatACource);
// get
courceRouter.get('/all-cource',getAllCources);
courceRouter.get('/:slug',getACource);
courceRouter.get('/instructor/all-cources',authMiddleware,isBothMiddleware,getCourcebyspecificInstutore);
courceRouter.get('/cource-category/:type',getAllCourcesByCategory);
//put
courceRouter.put('/',authMiddleware,isBothMiddleware,updatingCource);
// delete
courceRouter.delete('/:id',authMiddleware,isBothMiddleware,deleteCource);




/* ===================== lesson route =========== */

courceRouter.post('/lesson/:courceID',authMiddleware,isBothMiddleware,createAlesson);
courceRouter.post('/lesson/:courceId/:lessonId',authMiddleware,isBothMiddleware,deleteALesson);
courceRouter.get('/lesson/:lessonId',authMiddleware,isBothMiddleware,getALesson);
courceRouter.get('/lessons/:courceId',authMiddleware,isBothMiddleware,getAllCourceLesson);
courceRouter.put('/lesson/:lessonId',authMiddleware,isBothMiddleware,updateLession);

module.exports=courceRouter;