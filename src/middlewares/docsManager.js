import multer from 'multer'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //console.log('file.mimetype', file.mimetype, 'file.fieldname', file.fieldname)
    if (file.fieldname === 'profile' && file.mimetype === 'image/jpeg'){
      cb(null, 'public/resources/profiles')
    } else if (file.fieldname === 'product' && file.mimetype === 'image/jpeg') {
      cb(null, 'public/resources/products')
    } else if (file.fieldname === 'document') {
      cb(null, 'public/resources/documents')
    }else{
      cb(null, 'public/resources/junk')
    }
    
  },

  filename: function (req, file, cb) {
    const nombreParaGuardarElArchivo = /* Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + */ file.originalname
    cb(null, nombreParaGuardarElArchivo)
  }
})

const extractor = multer({ storage })
export const extraerFotoDePerfil = extractor.single('profile')
export const extraerTodo = extractor.any()