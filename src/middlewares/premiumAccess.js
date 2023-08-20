import { winstonLogger as logger } from "../utils/logger";

export function premiumAccess(req, res, next) {
  const usuario = req.session['user'];
  let aprobado = 0
  usuario.documents.find(e => e.name === 'identificacion') ? aprobado += 1 : null
  usuario.documents.find(e => e.name === 'domicilio') ? aprobado += 1 : null
  usuario.documents.find(e => e.name === 'cuenta') ? aprobado += 1 : null
  if (aprobado === 3) {
    next()
  }else{
    throw new Error('No cumple con todos los documentos')
  }
}