const keys=require('../config/keys')
const passport =require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require("../models/user")
passport.serializeUser((user,done)=>{
 done(null,user._id);
})
passport.deserializeUser(async(id,done)=>{
 try{
 const user = await User.findById(id)
 done(null,user)
 }catch(err){
  console.log(err);
 }
})

passport.use(new GoogleStrategy({
 clientID: keys.GoogleClientID,
 clientSecret: keys.GoogleClientSecret,
 callbackURL: "/api/auth/google/callback",
 proxy:true //to allow google to trust proxy
},
async (accessToken,refreshToken,profile,done)=>{
  console.log(accessToken);
 try{
 const foundUser= await User.findOne({googleId:profile.id})
 if(foundUser){
  return done(null,foundUser)
 }
  const user =await User.create({googleId:profile.id})
  done(null,user)
}catch(err){
 console.log(err)
}
}

));