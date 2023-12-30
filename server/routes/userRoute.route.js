const express=require('express');
const { registerAUser, loginUser, getAllUser, updateAUser ,deteleUser, getAUser, blockAUser, unblockblockAUser, updatePassword, forgetPasswordToken, resetPassword} = require('../controllers/userCtrl.controller');
const isAdmin = require('../middlewares/isAdminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const rateLimiter = require('../utils/reqLimit');
const userRoute=express.Router();

//post Route
userRoute.post('/register',rateLimiter(60*60*1000,"secounds",3),registerAUser);
userRoute.post('/login',loginUser);
userRoute.post("/forgot-password",forgetPasswordToken);

//get Route
userRoute.get('/all-users',isAdmin,getAllUser);
userRoute.get('/:id',authMiddleware,getAUser);

//All Put Route
userRoute.put('/update-profile',authMiddleware,updateAUser);
userRoute.put('/block/:id',authMiddleware,blockAUser);
userRoute.put('/unblock/:id',authMiddleware,unblockblockAUser);
userRoute.put('/update-password',authMiddleware,updatePassword);
userRoute.put('/reset-password/:token',resetPassword);

//all delete Routes
userRoute.delete('/:id',authMiddleware,isAdmin,deteleUser)
module.exports=userRoute;