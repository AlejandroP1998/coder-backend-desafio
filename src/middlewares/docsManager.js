import multer from 'multer'

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    console.log('file.mimetype', file.mimetype, 'file.fieldname', file.fieldname)
    if (file.fieldname === 'profile' && file.mimetype === 'image/jpeg'){
      cb(null, 'resources/profiles')
    } else if (file.fieldname === 'product' && file.mimetype === 'image/jpeg') {
      cb(null, 'resources/products')
    } else if (file.fieldname === 'document') {
      cb(null, 'resources/documents')
    }else{
      cb(null, 'resources/junk')
    }
  },

  filename: function (req, file, cb) {
    const nombreParaGuardarElArchivo = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname
    cb(null, nombreParaGuardarElArchivo)
  }
})

const extractor = multer({ storage })
export const extraerFoto = extractor.single('avatar')
export const extraerTodo = extractor.any()