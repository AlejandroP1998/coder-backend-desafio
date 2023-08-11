export function apiErrorHandler(error, req, res, next) {
  req.logger.error(`${error.message} - ${new Date().toLocaleTimeString()}`)
  //res.status(400).json({error:error.message})
  next(error)
}