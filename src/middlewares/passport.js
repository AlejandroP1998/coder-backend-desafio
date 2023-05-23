import passport from "passport";
import { Strategy } from "passport-local";
import { deshashear, hashear } from "../utils/criptografia.js";
import userModel from "../dao/models/schemaUser.js";
import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from "../config/github.config.js";
import { usersManager } from "../dao/DB/githubUsers.manager.js";
import { User } from "../entidades/User.js";



passport.use('login', new Strategy({
  usernameField: 'email',
}, async (username, password, done) => {
  const buscado = await userModel.findOne({ email: username })
  if (!buscado) {
    return done(new Error('Datos incorrectos'))
  }
  if (!deshashear(password, buscado.password)) {
    return done(new Error('Datos incorrectos'))
  }
  delete buscado.password
  done(null, buscado)
}))

passport.use('github', new GithubStrategy({
  clientID: githubClienteId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
  //console.log(profile)
  let user
  try {
    user = await usersManager.buscarPorEmail(profile.username)
  } catch (error) {
    // @ts-ignore
    user = new User({
      email: profile.username,
      rol: 'usuario'
    })
    await usersManager.guardar(user)
    //console.log('usersManager.obtenerTodos()', usersManager.obtenerTodos())
  }
  done(null, user)

}))

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()


export const autenticacionlocal = passport.authenticate('local')
export const autenticacionlogin = passport.authenticate('login')
export const autenticacionPorGithub = passport.authenticate('github', { scope: ['user:email'] })
export const autenticacionPorGithub_CB = passport.authenticate('github', { failWithError: true })
