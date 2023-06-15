export function apiErrorHandler(error, req, res, next) {
  if(error.message.startsWith('el campo')){
    res.status(400)
  }else{
    res.status(500)
  }
  res.json({state:'error', description: error.message})
}