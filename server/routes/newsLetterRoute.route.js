const { SubScribe , UnsubScribe} = require('../controllers/newsLetterCrtl.controller');


const  newsLatterRouter=require('express').Router();

//post
newsLatterRouter.post('/subscribe',SubScribe);
// delete
newsLatterRouter.delete('/unsubscribe/:id', UnsubScribe);



module.exports=newsLatterRouter;