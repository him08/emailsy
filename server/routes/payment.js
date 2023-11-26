const express=require('express')
const requireLogin =require('../middlewares/requireLogin')
const router =express.Router();
const passport= require('passport');
const {handleToken} = require('../controllers/payment')
router.post('/',requireLogin,handleToken)
module.exports=router