
const roleMiddleware=(req,res,next)=>{
  const role=req.user.role;
  const permittedRoles=['user','vendor'];
  if(permittedRoles.includes(role)){
    next();
  }
  else{
    return res.status(403).json({message:'forbidden access'});
  }
  
}
module.exports=roleMiddleware;