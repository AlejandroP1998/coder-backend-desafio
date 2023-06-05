import { PORT } from './config/server.config.js'
import { app } from './app/app.js'
import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from './config/mongodb.config.js'


await mongoose.connect(MONGODB_CNX_STR)
console.log('Conectando a la base de datos en -> ', MONGODB_CNX_STR)
app.listen(PORT, () => { console.log(`escuchando en puerto -> ${PORT}`) })