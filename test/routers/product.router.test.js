import assert from 'node:assert'
import supertest from "supertest"

const httpClient = supertest('http://localhost:8080')

let productoPrueba = {
  idProduct: 'prod-test',
  title: "Coca cola",
  description: "soda sabor cola",
  code: "ssc",
  price: 18,
  status: true,
  stock: 99,
  category: "alimentos"
}

describe('Api productos', () => {
  describe('--------------- POST to /api/product/ --------------- ', () => {
    describe('Peticion sin errores', () => {
      it('Crea el producto en la base de datos con el esquema correspondiente', async () => {

        const response = await httpClient.post('/api/product/').send(productoPrueba)

        assert.strictEqual(response.statusCode, 201)
        console.log(response.body)
      })
    })
  })

  describe('--------------- GET to /api/product/{id} --------------- ', () => {
    describe('Peticion sin errores', () => {
      it('Busca el producto con el id especificado en la base de datos para mostrarlo', async () => {

        const response = await httpClient.get(`/api/product/${productoPrueba.idProduct}`)

        assert.strictEqual(response.statusCode, 201)
        console.log(response.body)
      })
    })
  })

  describe('--------------- GET to /api/product/ --------------- ', () => {
    describe('Peticion sin errores', () => {
      it('Busca los productos en la base de datos para mostrarlos', async () => {

        const response = await httpClient.get('/api/product/')

        assert.strictEqual(response.statusCode, 201)
      })
    })
  })

  describe('--------------- DELETE to /api/product/{id} --------------- ', () => {
    describe('Peticion sin errores', () => {
      it('Busca el producto en la base de datos para eliminarlo', async () => {

        const response = await httpClient.delete(`/api/product/${productoPrueba.idProduct}`)

        assert.strictEqual(response.statusCode, 201)
        
      })
    })
  })

})