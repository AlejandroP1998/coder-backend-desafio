import assert from 'node:assert'
import supertest from "supertest"

const httpClient = supertest('http://localhost:8080')

const usuario = {
  email: 'adminCoder@coder.com',
  password: 'adminCoder123'
}

describe.only('Api sessions', () => {
  describe('POST to /api/login/', () => {
    describe('Peticion sin errores', () => {
      it('Busca el usuario en la base de datos', async () => {

        const response = await httpClient.post('/api/login/').send(usuario)

        assert.strictEqual(response.statusCode, 201)

      })
    })
  })
})