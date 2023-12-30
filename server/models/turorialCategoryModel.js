const mongoose=require('mongoose');

const TutorialCategorySchema=new mongoose.Schema({
      title:
      {
        type:String,
         require:true,
         unique:true
      },
      slug:{
        type:String,
        require:true,
        unique:true,
        index:true
      },
      image:{
        type:String,
        default:"https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg"
      }
     
},
{
    timestamps:true
}
)

module.exports=mongoose.model("TutorialCategory",TutorialCategorySchema)