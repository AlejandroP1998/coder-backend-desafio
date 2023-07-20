import mongoose from "mongoose"
import { MONGODB_CNX_STR } from "../src/config/mongodb.config.js"


export const mochaHooks = {
  async beforeAll() {
    // esto sucede antes de comenzar la primera prueba
    await mongoose.connect(MONGODB_CNX_STR)
  },

  async afterAll() {
    // esto sucede despues de finalizar la última prueba
    await mongoose.connection.dropCollection('tests') // antes de desconectarme borro la base que usé para las pruebas
    await mongoose.connection.close()
  }
}