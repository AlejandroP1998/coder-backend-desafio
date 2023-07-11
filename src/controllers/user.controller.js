import passport from 'passport'
import { user } from '../models/user.js'
import { userRepository } from '../repositories/user.repository.js'
import { hashear } from '../utils/criptografia.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await userRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const user = await userRepository.readMany(req.query)
      res.json(user)
    }
  } catch (error) { 
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const creado = await userRepository.create(req.body)
    res.status(201).json(creado)
  } catch (error) { 
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    if (req.params.id){
      const actualizado = await userRepository.updateOne(req.params.id, req.body)
      res.json(actualizado)
    }else{
      const password = hashear(req.body.password)
      let usuario = await userRepository.readOne({email: req.body.email})
      console.log('contraseña vieja',usuario)
      usuario.password = password
      const actualizado = await userRepository.updateOne({email: req.body.email}, usuario)
      console.log('contraseña nueva',usuario)
      res.json(actualizado)
    }
  } catch (error) { 
    next(error)
  }
}

export async function handleRolChange(req,res,next){
  try {
    const usuario = await userRepository.readOne(req.params.id)
    usuario.rol === 'user' ? usuario.rol = 'premium' : usuario.rol = 'user'
    const actualizado = await userRepository.updateOne(req.params.id, usuario)
    res.json(actualizado)
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await userRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) { 
    next(error)
  }
}