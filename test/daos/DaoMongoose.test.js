import mongoose from "mongoose"
import { DaoMongoose } from "../../src/daos/DaoMongoose.js"

//mocha test/daos/DaoMongoose.test.js

const testData = {
  property1: 'Josue',
  property2: 24
}

const testSchema = new mongoose.Schema({
  property1: { type: String, required: true },
  property2: { type: Number, required: true }
})

const testModel = mongoose.model('tests', testSchema)

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