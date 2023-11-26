const express=require('express')
const requireLogin =require('../middlewares/requireLogin')
const requireCredits =require('../middlewares/requireCredits')
const router =express.Router();
const {listSurveys,createSurvey,surveyWebhooks,thanks} = require('../controllers/survey')
router.get('/',requireLogin,listSurveys)
// router.post('/',requireLogin,requireCredits,createSurvey)
router.post('/',createSurvey)
router.get('/:surveyId/:response',thanks)
// router.post('/webhooks',surveyWebhooks)
module.exports=router