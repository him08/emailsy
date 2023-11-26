import React,{useState} from 'react'
import {reduxForm} from 'redux-form'
import SurveyForm from './SurveyForm'
import SurveyReview from '../Survey/SurveyReview'
const SurveyNew = () => {
 const [showSurveyReview, setShowSurveyReview] = useState(false);
 return (
  <div>
  {!showSurveyReview?
   <SurveyForm surveyReview={setShowSurveyReview}/>
   :<SurveyReview surveyReview={setShowSurveyReview}/>
  }
  </div>
 )
}

export default reduxForm({
form:'SurveyForm',
})(SurveyNew)
