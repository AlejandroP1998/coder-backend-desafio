import assert from 'node:assert'
import supertest from "supertest"

const httpClient = supertest('http://localhost:8080')
/* 
describe.only('Api carts', () => {
  describe('POST to /api/cart/', () => {
    describe('Peticion sin errores', () => {
      it('Crea el producto en la base de datos con el esquema correspondiente', async () => {

        const response = await httpClient.post('/api/product/').send({
          title: "Papaya",
          description: "fruta",
          code: "ppy",
          price: 5,
          status: true,
          stock: 9,
          category: "alimentos"
        })

        assert.strictEqual(response.statusCode, 201)

      })
    })
  })
}) */