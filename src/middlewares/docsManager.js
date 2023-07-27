import multer from 'multer'

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    console.log('file.mimetype', file.mimetype)
    cb(null, './resources')
  },

  filename: function (req, file, cb) {
    const nombreParaGuardarElArchivo = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname
    cb(null, nombreParaGuardarElArchivo)
  }
})

const extractor = multer({ storage })
export const extraerFoto = extractor.single('avatar')
export const extraerTodo = extractor.any()