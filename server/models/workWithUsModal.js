
const mongoose=require('mongoose');

const WorkSchema= new  mongoose.Schema({
  name:{
    type:String,
    require:true,
  },
  email:{
    type:String,
    require:true
  },
  mobile:{
    type:String,
    require:true,
  },
  profession:{
    type:String,
    require:true
  },
  currentJob:{
    type:String,
    require:true
  },
  resume:{
    type:String,
    require:true
  },
})

module.exports=mongoose.model('Work',WorkSchema);