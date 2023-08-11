import passport from "passport";
import { Strategy } from "passport-local";
import { deshashear } from "../utils/criptografia.js";
import { userDaoMongoose } from "../daos/user.dao.mongoose.js";
import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from "../config/github.config.js";
import { userService } from "../services/github.service.js";
import { cartRepository } from "../repositories/cart.repository.js";
import { cart } from "../models/cart.js";
import { user } from "../models/user.js";
import { userRepository } from "../repositories/user.repository.js";
import Swal from "sweetalert2";



passport.use('login', new Strategy({
  usernameField: 'email',
}, async (username, password, done) => {
  const buscado = await userDaoMongoose.readOne({ email: username })

  if (!buscado) {
    return done(new Error('Datos incorrectos'))
  }
  if (!deshashear(password, buscado.password)) {
    return done(new Error('Datos incorrectos'))

  }
  await userDaoMongoose.updateOne({ email: username }, { last_connection: new Date().toLocaleTimeString() })
  const carrito = new cart({ idCart: buscado.cartId })
  const finded = await cartRepository.readOne({ idCart: carrito.dto().idCart })
  finded ? null : cartRepository.create(carrito.dto())

  delete buscado.password
  done(null, buscado)

}))

passport.use('github', new GithubStrategy({
  clientID: githubClienteId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
  //console.log(profile)
  let usuario
  try {
    usuario = await userRepository.readOne({ email: profile.username })
    //user = await userService.buscarPorEmail(profile.username)
  } catch (error) {
    // @ts-ignore
    usuario = new user({
      first_name: 'usuario de github',
      last_name: 'Github',
      email: profile.username,
      age: 30,
      password: 'git'
    })
    /* user = new user({
      email: profile.username
    })
    await userService.guardar(user) */
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
