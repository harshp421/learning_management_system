const mongoose = require('mongoose'); // Erase if already required
const bcrypt=require('bcrypt');
const crypto=require("crypto");
// Declare the Schema of the Mongo model
let  userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        
    },
    lastname:{
        type:String,
        required:true,
       
    },
    user_image:{
        type:String,
        default:"https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png"

    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    mobile:{
        type:String,
        unique:true,
        index:true
    },
    password:{
        type:String,
        
    },
    roles:{
        type:String,
        default:"user",
    },
    profession:{
        type:String,
        
    },
    isBlocked:{
        type: Boolean,
        default:false
    },
    stripe_account_id:String,
    stripe_seller:{},
    stripeSession:{},
   passwordChangeAt:Date,
   passwordResetToken:String,
   passwordResetExpries:Date,
   

},{
    timestamps:true
});

// encrypt the passeord 

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
    {
        next();
    }
  const salt=await bcrypt.genSalt(10);
  this.password= await bcrypt.hash(this.password,salt);
  next();
})


userSchema.methods.ispasswordMatched=async function(enterPassword){
   return await bcrypt.compare(enterPassword,this.password);
}



userSchema.methods.createPasswordResetToken=async function()
{
    const resettoken=crypto.randomBytes(32).toString("hex");
    this.passwordResetToken=crypto.createHash("sha256").update(resettoken).digest("hex");
    this.passwordResetExpries=Date.now()+30*60*1000; //10 monute
    return resettoken;

}

//Export the model
module.exports = mongoose.model('User', userSchema);