import StripeCheckout from 'react-stripe-checkout'
import {useDispatch} from 'react-redux'
import React from 'react'
import {handleToken} from '../../redux/actions/authAction'
const Payment = () => {
 console.log(process.env.REACT_APP_STRIPE_KEY);
 const dispatch = useDispatch()
 return (
  <StripeCheckout
   name={"Emaisy"}
   description={"Buy credits worth ₹500"}
   currency="INR"
   amount={50000}
   token={(token)=>dispatch(handleToken(token))}  //stripe verify token first
   stripeKey={process.env.REACT_APP_STRIPE_KEY}
  >
 <button className='btn' style={{backgroundColor:"teal"}}>Add Credits</button>
  </StripeCheckout>
 )
}

export default Payment
