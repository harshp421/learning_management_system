const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var LessonSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:350,
        trim:true
    },
    slug:{
        type:String,
        required:true,
    
    },
    content:{
        type:String,
        maxlength:3000,
        
    },
    video:{
        type:String,

    },
    free_preview:{
        type:Boolean,
        default:false
    }
   
});

//Export the model
module.exports = mongoose.model('Lesson', LessonSchema);