const mongoose =require('mongoose')

const surveySchema= new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
 title:String,
 subject:String,
 body:String,
 recipients:[{
  email:String,
  responded:{
   type:Boolean,
   default:false
  },
  lastResponded:Date
 }],
 dateSent:{
  type:Date,
  default: Date.now
 },
 yes:{
  type:Number,
  default:0
 },
 no:{
  type:Number,
  default:0
 },
})

module.exports=mongoose.model('survey',surveySchema)
