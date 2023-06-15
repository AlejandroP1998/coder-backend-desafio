export function currentRol(req,res,next){
  if(req.session.rol==='admin'){
    next()
  }else{
    res.redirect('/api/login/')
  }
}