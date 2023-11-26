import {FETCH_SURVEYS} from '../actions/types'
// eslint-disable-next-line import/no-anonymous-default-export
export default (state=null,action)=>{
 switch(action.type){
  case FETCH_SURVEYS:{
    return action.payload
  }
  default:
   return state;
 }
}