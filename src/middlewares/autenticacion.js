import { winstonLogger as logger } from "../utils/logger.js"

export function autenticacion(req,res,next){
  if(req.session.user){
    logger.info(`usuario autenticado - ${new Date().toLocaleTimeString()}`)
    next()
  }else{
    res.redirect('/api/register/')
    next()
  }
}