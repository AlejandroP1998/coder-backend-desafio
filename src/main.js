import { PORT } from './config/server.config.js'
import { app } from './app/app.js'
import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from './config/mongodb.config.js'
import { winstonLogger as logger } from './utils/logger.js'

await mongoose.connect(MONGODB_CNX_STR)
logger.info(`Conectando a la base de datos en ->  ${MONGODB_CNX_STR} - ${new Date().toLocaleTimeString()}`)
app.listen(PORT, () => { logger.info(`escuchando en puerto -> ${PORT} - ${new Date().toLocaleTimeString()}`) })