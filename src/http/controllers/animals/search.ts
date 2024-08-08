import { makeSearchAnimalsUseCase } from '@/use-cases/factories/make-search-animals-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchAnimalsQuerySchema = z.object({
    page: z.coerce.number().min(1).positive().default(1),
    city: z.string().optional(),
    state: z.string().optional(),
    q: z
      .string()
      .transform((str) => JSON.parse(str))
      .pipe(
        z.object({
          size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
          age: z.enum(['CUB', 'ADULT', 'SENIOR']).optional(),
          activity_Level: z
            .enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'])
            .optional(),
          independency_Level: z
            .enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'])
            .optional(),
          ambient: z.enum(['INDOOR', 'OUTDOOR', 'BOTH']).optional(),
        }),
      )
      .optional(),
  })

  const { q, page, city, state } = searchAnimalsQuerySchema.parse(request.query)

  const searchAnimalsUseCase = makeSearchAnimalsUseCase()

  const { animals } = await searchAnimalsUseCase.execute({
    query: q,
    page,
    city,
    state,
  })

  return reply.status(200).send({
    animals,
  })
}
