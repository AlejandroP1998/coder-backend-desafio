import mongoose from "mongoose"
import { DaoMongoose } from "../../src/daos/DaoMongoose.js"

//mocha test/daos/DaoMongoose.test.js

const testData = {
  property1: 'Josue',
  property2: 24
}
1
const testSchema = new mongoose.Schema({
  property1: { type: String, required: true },
  property2: { type: Number, required: true }
})
const testModel = mongoose.model('tests', testSchema)

before(async () => {
  // esto sucede antes de comenzar la primera prueba
  await mongoose.connect('mongodb+srv://coderUser:123abc123@cluster0.raqdy9j.mongodb.net/ecommerce')
})

after(async () => {
  // esto sucede despues de finalizar la última prueba
  await mongoose.connection.dropCollection('tests') // antes de desconectarme borro la base que usé para las pruebas
  await mongoose.connection.close()
})

describe('dao mongoose', () => {
  describe('create', () => {
    describe('cuando llamo al create con un objeto con el esquema correspondiente', () => {
      it('devuelve el mismo objeto sin agregarle ningun campo ni metodos', async () => {
        const dao = new DaoMongoose(testModel)
        const dto = await dao.create(testData)
      })
    })

  })

})