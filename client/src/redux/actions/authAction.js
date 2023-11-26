import axios from 'axios'
import {FETCH_USER} from './types'

export const FetchUser=()=>{
 return async (dispatch)=>{
  try{
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/google/me`)
  console.log(response.data);
  dispatch({ type: FETCH_USER, payload: response.data});
  }catch(err){
   console.log(err);
  }
 }
}
export const handleToken=(token)=>{
 return async (dispatch)=>{
  try{
   console.log('hello')
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/stripe`,{token})
  console.log(response.data);
  dispatch({ type: FETCH_USER, payload: response.data});
  }catch(err){
   console.log(err);
  }
 }
}