import { Router } from "express";
import { autenticacionPorGithub, autenticacionPorGithub_CB } from "../middlewares/passport.js";
import { logoutSessionsController } from "../controllers/sessions.controller.js";

export const githubRouter = Router()

//login con github
githubRouter.get('/github', autenticacionPorGithub)
githubRouter.get('/githubcallback', autenticacionPorGithub_CB, (req, res, next) => {
  req.session.user = req.user['email']
  //console.log('req.user', req.user['email'])
  res.redirect('/api/products/')
})

//logout
githubRouter.post('/logout', logoutSessionsController)