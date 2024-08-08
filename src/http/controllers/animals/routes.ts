import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'

export async function animalsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/animals/create', create)
  app.get('/animals/search', search)
}
