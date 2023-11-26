require('dotenv').config()
const express =require('express')
const keys =require('./config/keys')
require('./services/passport')
const cookieSession =require('cookie-session')
const app=express()
const path = require("path")
const PORT = 5000
const connectDB = require("./database/db")
const passport = require('passport')
const authRoutes=require('./routes/auth')
const paymentRoutes=require('./routes/payment')
const surveyRoutes=require('./routes/survey')
const helpers= require('./services/sendEmail')
//connect to database
connectDB()
app.use(express.json())
app.use(cookieSession({
 maxAge:30 * 24 * 60 * 60 * 1000,
 keys:[keys.CookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/auth/google',authRoutes);
app.use('/api/stripe',paymentRoutes)
app.use('/api/surveys',surveyRoutes)
if (process.env.NODE_ENV === "production") {
 app.use(express.static(path.join(__dirname, "../client", "build")))
 app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "../client", "build", "index.html"))
 })
}
app.listen(process.env.PORT||PORT,()=>{
 console.log(`Server is running on PORT ${PORT}`)
})