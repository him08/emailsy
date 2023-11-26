import React from 'react'
import {reduxForm,Field} from 'redux-form'
import SurveyField from './SurveyField'
import {Link} from 'react-router-dom'
import emailValidation from '../../utils/emailValidation'
const SurveyForm = (props) => {
  const {surveyReview,handleSubmit}=props;
 return (
  <div>
    <form onSubmit={handleSubmit(()=>surveyReview(true))}>
      <Field
      label="Survey Title"
        name="title"
        type="text"
        component={SurveyField}
        
      />
      <Field
        name="subject"
        type="text"
        component={SurveyField}
        label="Subject Line"
      />
      <Field
        name="body"
        type="text"
        label="Email Body"
        component={SurveyField}
      />
      <Field
        name="recipients"
        type="text"
        label="Recipients List (comma seperated)"
        component={SurveyField}
      />
      <div>
      <Link to="/surveys" className="red btn-flat white-text">
        Cancel
      </Link>
        <button  type="submit" className="teal btn-flat right white-text">
          Submit
          <i className="material-icons right">done</i>
        </button>
      </div>
    </form>
  </div>
 )
}
const validate=(values)=>{
  const errors={}
  errors.recipients=emailValidation(values.recipients|| "")
  if(!values.title){
    errors.title="You must provide a title"
  }
  if(!values.subject){
    errors.subject="You must provide a subject"
  }
  if(!values.body){
    errors.body="You must provide a body"
  }
  if(!values.recipients){
    errors.recipients="You must provide recipients"
  }
  return errors;
}
export default reduxForm({
  validate,
 form:'SurveyForm',
 destroyOnUnmount:false
})(SurveyForm)
