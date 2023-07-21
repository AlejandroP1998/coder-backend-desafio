import assert from 'node:assert'
import supertest from "supertest"

const httpClient = supertest('http://localhost:8080')

const carrito = {
  idCart: 'cartTest',
  products: []
}

const idProduct = '9e8a00a7b88d'

describe('Api carts', () => {
  describe('--------------- POST to /api/cart/ --------------- ', () => {
    describe('Peticion sin errores', () => {
      it('Crea un carrito en la base de datos con el esquema correspondiente', async () => {

        const response = await httpClient.post('/api/cart/').send(carrito)
        assert.strictEqual(response.statusCode, 201)
        console.log(response.body)

      })
    })
  })

  describe('--------------- POST to /api/{cart-id}/products/{product-id} --------------- ', () => {
    describe('Peticion sin errores', () => {
      it('Inserta un producto en el carrito correspodiente', async () => {

        const response = await httpClient.post(`/api/cart/${carrito.idCart}/products/${idProduct}`)
        assert.strictEqual(response.statusCode, 201)
        console.log(response.body)

      })
    })
  })

  describe('--------------- DELETE to /api/cart/{cart-id} --------------- ', () => {
    describe('Peticion sin errores', () => {
      it('Busca el carrito en la base de datos para proceder a eliminarlo', async () => {

        const response = await httpClient.delete(`/api/cart/${carrito.idCart}`)
        assert.strictEqual(response.statusCode, 201)

      })
    })
  })

})