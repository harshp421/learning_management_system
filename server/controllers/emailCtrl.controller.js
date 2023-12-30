const nodemailer=require('nodemailer');
const asyncHandler=require('express-async-handler');

const sendEmail=asyncHandler(async(data,req,res)=>{
   let transportar=nodemailer.createTransport({
      host:"smtp.gmail.com",
      port:587,
      secure:false,
      auth:{
        user:process.env.MAIL_ID,
        pass:process.env.MP,
      },

   });
   let info=await transportar.sendMail({
      from:"harshparmar0421@gmail.com",
      to:data.to,
      subject:data.subject,
      text:data.text,
      html:data.html
   });
   console.log("message Send ",info.messageId);
    console.log("preview url",nodemailer.getTestMessageUrl(info))
})


module.exports=sendEmail;