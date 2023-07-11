import { userRepository } from '../repositories/user.repository.js'
import { deshashear, hashear } from '../utils/criptografia.js'

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
      if(password === deshashear(usuario.password))throw new Error('La contraseña no puede ser la misma')
      usuario.password = password
      const actualizado = await userRepository.updateOne({email: req.body.email}, usuario)
      res.json(actualizado)
    }
  } catch (error) { 
    next(error)
  }
}

export async function handleRolChange(req,res,next){
  try {
    const usuario = await userRepository.readOne({email: req.session.user.email})
    usuario.rol === 'user' ? usuario.rol = 'premium' : usuario.rol = 'user'
    await userRepository.updateOne({ email: req.session.user.email }, usuario)
    req.session.user = usuario
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