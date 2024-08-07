import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'JavaScript',
      address: 'Avenida Cristiano Machado',
      cep: '31155555',
      phone: 'any_phone',
      email: 'any_email@email.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
  })
})
