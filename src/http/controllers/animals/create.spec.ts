import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/tests/create-and-authenticate-organization'

describe('Create (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new animal', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    console.log(token)

    const response = await request(app.server)
      .post('/animals/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pepino',
        description: 'A cat',
        requirements: ['Love', 'Care'],
        size: 'SMALL',
        activityLevel: 'MEDIUM',
        independencyLevel: 'MEDIUM',
        ambient: 'INDOOR',
        age: 'ADULT',
      })

    expect(response.statusCode).toBe(201)
  })
})
