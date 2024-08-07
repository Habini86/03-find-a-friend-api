import { env } from '@/env'
import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    address: z.string(),
    cep: z.string(),
    phone: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, address, cep, phone, email, password } =
    registerBodySchema.parse(request.body)

  try {
    const geocodeBodySchema = z.array(
      z.object({
        place_id: z.number(),
        licence: z.string(),
        osm_type: z.string(),
        osm_id: z.number(),
        boundingbox: z.array(z.string()),
        lat: z.string(),
        lon: z.string(),
        display_name: z.string(),
        class: z.string(),
        type: z.string(),
        importance: z.number(),
      }),
    )

    const responseGeocode = await fetch(
      `https://geocode.maps.co/search?q=${address + ' ' + cep}&api_key=${env.API_KEY}`,
    )

    const dataGeoCode = await responseGeocode.json()

    const parsedDataGeoCode = geocodeBodySchema.parse(dataGeoCode)

    const { display_name: geoAddress } = parsedDataGeoCode[0]

    const addressParts = geoAddress.split(',')

    const city =
      addressParts[addressParts.length - 5]?.split('de').pop()?.trim() || ''

    const state = addressParts[addressParts.length - 4]?.trim() || ''

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
  } catch (err) {
    return reply.status(400).send({ message: 'Invalid address or cep.' })
  }
}
