const keys=require('../config/keys')
const stripe=require('stripe')(keys.StripeSecretKey)
exports.handleToken=async(req,res)=>{
 const {token} =req.body
 try{
  console.log('token',token)
const customer = await stripe.customers.create({
  email: token.email,
  source: token.id
})
 const charge = await stripe.paymentIntents.create({
  amount: 50000,
  currency: 'inr',
  customer: customer.id,
  description: 'Credits worth ₹500',
});
console.log(req.user.credits);
req.user.credits+=5;
const user =await req.user.save();
return res.json(user);
 }catch(error){
   console.log(error);
   return res.status(400).json({error:"Something went wrong"})
 }

}