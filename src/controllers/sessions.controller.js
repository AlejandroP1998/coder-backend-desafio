export function getCurrentSessionController(req, res, next) {
  // passport guarda la sesion directamente en ** req.user ** en lugar del campo session de la peticion !
  res.json(req.user)
}

export async function logoutSessionsController(req, res, next) {
  // lo que estaba acá lo reemplacé por el atajo que me provee passport
  req.logout(err => {
    res.sendStatus(200)
  })
}

export function postSessionsController(req, res, next) {
  res.status(201).json(req.user)
}