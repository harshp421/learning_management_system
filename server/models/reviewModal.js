const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ReviewSchema = new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    isApproved:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Review', ReviewSchema );