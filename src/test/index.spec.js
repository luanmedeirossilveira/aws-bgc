const request = require("supertest")
const app = require('../index')

describe('Teste de mapeamento dos produtos', () => {
  it('Verificar se o corpo response irá retornar', async () => {
    const res = await request(app).get("/api/products/maps")

    expect(res.body).toHaveProperty('response')
  })
})

describe('Teste de procura dos produtos', () => {
  it('Verificar se o corpo response irá retornar', async () => {
    const res = await request(app).get("/api/products/finds")

    expect(res.body).toHaveProperty('response')
  })
})