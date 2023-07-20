import { PORT } from './config/server.config.js'
import { app } from './app/app.js'
import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from './config/mongodb.config.js'
import { winstonLogger as logger } from './utils/logger.js'
import 'dotenv/config'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce coderhouse',
      description:
        'Proyecto del curso de programacion backend en javascript',
      version: '1.0.0',
    },
  },
  apis: ['./docs/**/*.yaml'],
}

const specs = swaggerJSDoc(options)

console.log('Documentacion disponible en http://localhost:8080/api/docs/')
//logger.info('Documentacion disponible en http://localhost:8080/api/docs/')

if (process.env.NODE_ENV === 'production') {
  logger.info('entorno de produccion')
} else {
  logger.info('entorno de desarrollo')
}

app.use('/api/docs', swaggerUi.serve,swaggerUi.setup(specs))

await mongoose.connect(MONGODB_CNX_STR)
logger.info(`Conectando a la base de datos en ->  ${MONGODB_CNX_STR} - ${new Date().toLocaleTimeString()}`)
app.listen(PORT, () => { logger.info(`escuchando en puerto -> ${PORT} - ${new Date().toLocaleTimeString()}`) })