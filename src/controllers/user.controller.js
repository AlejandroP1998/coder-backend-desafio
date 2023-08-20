import { userRepository } from '../repositories/user.repository.js'
import { usersService } from '../services/user.service.js'
import { deshashear, hashear } from '../utils/criptografia.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await userRepository.readOne({ id: req.params.id })
      res.json({nombre: buscado.first_name, email: buscado.email, tipo_de_cuenta: buscado.rol})
    } else {
      const users = await userRepository.readMany(req.query)
      const fixedUsers = []
      
      users.forEach(user => {
        fixedUsers.push({
          nombre: user.first_name, 
          email: user.email, 
          tipo_de_cuenta: user.rol 
        })
      });

      res.json(fixedUsers)
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
    if (req.params.id) {
      const actualizado = await userRepository.updateOne(req.params.id, req.body)
      res.json(actualizado)
    } else {
      const password = hashear(req.body.password)
      let usuario = await userRepository.readOne({ email: req.body.email })
      if (password === deshashear(usuario.password)) throw new Error('La contraseña no puede ser la misma')
      usuario.password = password
      const actualizado = await userRepository.updateOne({ email: req.body.email }, usuario)
      res.json(actualizado)
    }
  } catch (error) {
    next(error)
  }
}

export async function handleRolChange(req, res, next) {
  //+ Si ingresa un uid a la peticion modifica el rol del usuario con el id indicado, de lo contrario modifica el usuario de la sesion
  try {
    if (req.params.id) {
      const usuario = await userRepository.readOne({ idUser: req.params.id })
      usuario.rol === 'user' ? usuario.rol = 'premium' : usuario.rol = 'user'
      await userRepository.updateOne({ idUser: req.params.id }, usuario)
      req.session['user'] = usuario
    } else {
      const usuario = await userRepository.readOne({ email: req.session.user.email })
      usuario.rol === 'user' ? usuario.rol = 'premium' : usuario.rol = 'user'
      await userRepository.updateOne({ email: req.session.user.email }, usuario)
      req.session['user'] = usuario
    }
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    if(req.params.id){
      await userRepository.deleteOne({ idUser: req.params.id })
      res.status(201).json({ "message": "usuario eliminado" })
    }else{
      usersService.delete()
      res.status(201).json({"message":"usuarios sin conectarse por 2 dias eliminados"})
    }
  } catch (error) {
    next(error)
  }
}

//* Controlador de documentos
export async function handleDocs(req, res, next) {
  try {
    res.status(201).json(req.file)
  } catch (error) {
    next(error)
  }
}