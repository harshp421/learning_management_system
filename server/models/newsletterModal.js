const mongoose = require("mongoose");

 const newsLetterModal = new mongoose.Schema({
    email:{
        type:String,
        required:true,
         unique:true
    }
 },{
     timestamps:true
 })

 module.exports=mongoose.model("NewsLetter", newsLetterModal)