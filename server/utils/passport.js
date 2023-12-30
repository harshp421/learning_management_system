const passport  = require('passport');
const User = require('../models/userModel');

const  GoogleStrategy=require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy(
    {
        clientID:"686315321771-0l8mjpj4fbcmijsb5mp6c9mhnha42q2n.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:4000/auth/google/callback",
        scope:["profile","email"]
    },
    async function(accessToken, refreshToken, profile, done) {
         
          let data=profile?._json;
          const user=await User.findOne({email:data.email});
          if(user)
          {
            return await done(null,user);
          }else
          {
            const newUser=await User.create({
                firstname:data.name,
                lastname:data.given_name,
                user_image:data.picture,
                email:data.email,
                roles:"user"

            })
            return await done(null,newUser)
        }
         
        
      }
));

passport.serializeUser((user,done)=>{
  done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
  })