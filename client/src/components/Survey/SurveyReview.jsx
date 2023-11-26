import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {createSurvey} from '../../redux/actions/surveyAction'
const SurveyReview = ({surveyReview}) => {
 const history=useHistory();
 const dispatch = useDispatch();
 const form = useSelector(state => state.form)
 const {body,recipients,subject,title}=form.SurveyForm.values;
 const sendSurvey=()=>{
  dispatch(createSurvey(form.SurveyForm.values,history));
 }
 return (
  <div>
   <h5>Please confirm your entries</h5>
   
   <div>
    <label>Survey Title</label>
    <div>{title}</div>
   </div>
   <div>
    <label>Subject Line</label>
    <div>{subject}</div>
   </div>
   <div>
    <label>Email Body</label>
    <div>{body}</div>
   </div>
   <div style={{marginBottom:'25px'}}>
    <label>Recipients List</label>
    <div>{recipients}</div>
   </div>
   <button className='yellow darken-3 btn-flat' onClick={()=>surveyReview(false)}>
    Back
   </button>
   <button className='teal btn-flat right white-text' onClick={sendSurvey}>
    Send Survey
    <i className="material-icons right">email</i>
   </button>
  </div>
 )
}

export default SurveyReview
