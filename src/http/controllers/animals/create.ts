import { makeCreateAnimalUseCase } from '@/use-cases/factories/make-create-animal-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAnimalBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    requirements: z.array(z.string()),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    activityLevel: z.enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
    independencyLevel: z.enum([
      'VERY_LOW',
      'LOW',
      'MEDIUM',
      'HIGH',
      'VERY_HIGH',
    ]),
    ambient: z.enum(['INDOOR', 'OUTDOOR', 'BOTH']),
    age: z.enum(['CUB', 'ADULT', 'SENIOR']),
  })

  const organizationId = request.user.sub

  const {
    name,
    description,
    requirements,
    size,
    activityLevel,
    independencyLevel,
    ambient,
    age,
  } = createAnimalBodySchema.parse(request.body)

  const animalUseCase = makeCreateAnimalUseCase()

  await animalUseCase.execute({
    name,
    description,
    requirements,
    size,
    age,
    activity_Level: activityLevel,
    independency_Level: independencyLevel,
    ambient,
    organization_Id: organizationId,
  })

  return reply.status(201).send()
}
