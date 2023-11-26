import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from "react-router-dom"
import {fetchSurveys} from '../../redux/actions/surveyAction'
const Dashboard = () => {
  const surveys = useSelector((state) => state.surveys)
 const dispatch = useDispatch()
  useEffect(() => {
    const getSurveys=async()=>{
   await dispatch(fetchSurveys())
    }
    getSurveys()
  }, [surveys])
 return (
   <>
   {surveys? surveys.reverse().map((survey)=>
   <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
   ):<h3>Loading...</h3>}
  <div className="fixed-action-btn">
  <Link to="/surveys/new" className="btn-floating btn-large red">
    <i className="large material-icons">add</i>
  </Link>
</div>
      

  </>
)
}

export default Dashboard
