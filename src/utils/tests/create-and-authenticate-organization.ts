import { env } from '@/env'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  const password = '123456'
  const email = 'any_email@email.com'

  await prisma.organization.create({
    data: {
      name: 'JavaScript',
      address: 'any_address',
      cep: 'any_cep',
      city: 'Belo Horizonte',
      state: 'Minas Gerais',
      phone: 'any_phone',
      email,
      password_Hash: await hash(password, env.NUMBER_PASS_HASH),
    },
  })

  const authToken = await request(app.server).post('/sessions').send({
    email,
    password,
  })

  const { token } = authToken.body

  return {
    token,
  }
}
