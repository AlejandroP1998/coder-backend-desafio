export function currentRol(req,res,next){
  if (req.session.rol === 'admin' || req.session.rol === 'premium' ){
    next()
  }else{
    res.redirect('/api/login/')
  }
}