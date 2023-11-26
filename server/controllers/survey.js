const _ =require('lodash')
const {Path} =require('path-parser')
const {URL}=require('url')
const mongoose =require('mongoose')
const Survey = require('../models/survey')
// const sgMail = require("@sendgrid/mail")
// const {SendGridKey} =require('../config/keys')

const {sendEmail}= require('../services/sendEmail')
const keys=require('../config/keys')
const {RedirectDomainDev,RedirectDomainProd}=keys
exports.createSurvey= async(req,res)=>{
 const {title,body,subject,recipients}=req.body
 const survey =await Survey.create({
  title,
  body,
  subject,
  recipients:recipients.split(",").map((email)=>({email:email.trim()})),
  user:req.user.id
 })
 try{
  let urlY,urlN;
  if(process.env.NODE_ENV==="production"){
   urlY=`${RedirectDomainProd}/api/surveys/${survey._id}/yes`
   urlN=`${RedirectDomainProd}/api/surveys/${survey._id}/no`
  }
  else{
   urlY=`${RedirectDomainDev}/api/surveys/${survey._id}/yes`
   urlN=`${RedirectDomainDev}/api/surveys/${survey._id}/no`
  }
 await sendEmail(survey,urlY,urlN)
 req.user.credits-=1;
 const user= await req.user.save();
 return res.status(200).json(user)
 }catch(err){
  return res.status(400).json({success:false,message:'Failed to send email'})
 }
}
exports.listSurveys=async (req,res)=>{
 const surveys= await Survey.find({
   user:req.user.id
 }).select({recipients:false})
 res.json(surveys)
}
exports.thanks=(req,res)=>{
 res.json({'msg':'Thank you for feedback!'})
 surveyWebhooks(req.params.surveyId,req.params.response)
}
const surveyWebhooks=(surveyId, response)=>{
//  const p =new Path('/api/surveys/:surveyId/:response')
//  _.chain(req.body)
//  .map(({email,url})=>{
//  const pathname= new URL(url).pathname
//  const match = p.test(pathname)
//  if(match){
//   return {email,surveyId:match.surveyId,response:match.response}
//  }
//  })
//  .compact()
//  .uniqBy('email','surveyId')
//  .each(({email,surveyId,response})=>{
  console.log(response)
  Survey.updateOne({
   _id:surveyId,
  //  recipients:{
  //   $elemMatch:{email,responded:false}
  //  } //find query
  },
  {
   $inc: {[response]:1},
  //  $set: {'recipients.$.responded':true},//$ refers to result of find query
   lastResponded: new Date()
  })
   .exec()
//  })
//  .value()
//  res.send({})
}
