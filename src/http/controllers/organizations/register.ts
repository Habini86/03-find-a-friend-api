import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    address: z.string(),
    cep: z.string(),
    city: z.string(),
    state: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, address, cep, city, state, phone, email, password } =
    registerBodySchema.parse(request.body)

  try {
    const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

    await registerOrganizationUseCase.execute({
      name,
      address,
      cep,
      city,
      state,
      phone,
      email,
      password,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
