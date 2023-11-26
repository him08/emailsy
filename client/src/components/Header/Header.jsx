import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {FetchUser} from '../../redux/actions/authAction'
import Payment from '../Payment/Payment'
const Header = () => {
  const clearCookies=()=>{
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  }
 const auth = useSelector((state) => state.auth)
 const dispatch = useDispatch()
 const renderContent=()=>{
  switch(auth){
   case null:
    return;
    case false:
     return <li><a href={`${process.env.REACT_APP_BACKEND_URL}/api/auth/google`}>Login With Google</a></li>
     default:
      return [
        <li key="1"><Payment/></li>,
        <li key="2" style={{margin:"0 10px"}}>Credits: {auth?.credits}</li>,
      <li key="3"><a onClick={clearCookies} href={`${process.env.REACT_APP_BACKEND_URL}/api/auth/google/logout`}>Logout</a></li>
    ]
  }
 }
 useEffect(() => {
  dispatch(FetchUser())
}, [])
 return (
    <nav style={{marginBottom:'50px',paddingLeft:'10px'}}>
    <div className="nav-wrapper">
      <Link to={auth?'/surveys':'/'} className="left p-2 brand-logo">Emailsy</Link>
      <ul className="right">
        {renderContent()}
      </ul>
    </div>
  </nav>
  
 )
}

export default Header
