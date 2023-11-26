const {RedirectDomainDev,RedirectDomainProd}=require('../config/keys')
exports.currentUser=(req,res)=>{
 res.send(req.user)
}
exports.logoutUser=(req,res)=>{
 req.logout();
 res.redirect('/')
}
exports.handleCallback=(req,res)=>{
  if(process.env.NODE_ENV === "production"){
    res.redirect(`${RedirectDomainProd}/surveys`)
  }
  else{
    res.redirect(`${RedirectDomainDev}/surveys`)
  }
}