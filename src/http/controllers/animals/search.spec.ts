import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/tests/create-and-authenticate-organization'

describe('Search (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a new animal', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
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

    await request(app.server)
      .post('/animals/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Armario',
        description: 'A dog',
        requirements: ['Love', 'Care'],
        size: 'LARGE',
        activityLevel: 'MEDIUM',
        independencyLevel: 'MEDIUM',
        ambient: 'INDOOR',
        age: 'ADULT',
      })

    const response = await request(app.server)
      .get('/animals/search')
      .query({
        page: 1,
        q: JSON.stringify({ size: 'SMALL' }),
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.animals).toHaveLength(1)
    expect(response.body.animals).toEqual([
      expect.objectContaining({
        name: 'Pepino',
      }),
    ])
  })
})
