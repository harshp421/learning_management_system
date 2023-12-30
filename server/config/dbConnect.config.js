const mongoose = require("mongoose");

// code fot connect database 
const dbConnect=async()=>{
    try{
     const connection= await mongoose.connect(process.env.MONGODB__URI);
     console.log("Database Connect Successfully");

    }catch(error)
    {
    console.error(error);
    }
}

module.exports =dbConnect;