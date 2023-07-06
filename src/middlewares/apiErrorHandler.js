export function apiErrorHandler(error, req, res, next) {
  req.logger.error(`${error.message} - ${new Date().toLocaleTimeString()}`)
  next(error)
}