import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import { ZodError } from 'zod'
import { organizationsRoutes } from './http/controllers/organizations/routes'

import fastifyMultipart from 'fastify-multipart'
import { animalsRoutes } from './http/controllers/animals/routes'

export const app = fastify()

app.register(fastifyMultipart)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(organizationsRoutes)

app.register(animalsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
