const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ContactSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true,
        index:true
     },
     email:
     {
        type:String,
         required:true
     },
     mobile:{
        type:String,
        unique:true,
        
    },
    subject:{
        type:String,
        required:true,
      
    },
    profession:{
        type:String,
        required:true,
       
    },
    comment:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Submited"

    }
},
{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Contact', ContactSchema );