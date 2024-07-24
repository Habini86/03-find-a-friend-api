import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repository/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { CreateAnimalUseCase } from './create-animal'
import { InMemoryAnimalsRepository } from '@/repository/in-memory/in-memory-animals-repository'
import { env } from '@/env'
import ResourcesNotFoundError from './errors/resources-not-found-error'

let sut: CreateAnimalUseCase
let organizationsRepository: InMemoryOrganizationsRepository
let animalsRepository: InMemoryAnimalsRepository

describe('Create Animal Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    animalsRepository = new InMemoryAnimalsRepository()
    sut = new CreateAnimalUseCase(animalsRepository, organizationsRepository)

    await organizationsRepository.create({
      id: 'organization-01',
      name: 'JavaScript',
      address: 'any_address',
      cep: 'any_cep',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password_Hash: await hash('123456', env.NUMBER_PASS_HASH),
    })
  })

  it('should be able to create a new animal', async () => {
    const { animal } = await sut.execute({
      name: 'dog',
      description: 'any_description',
      requirements: ['any_requirement'],
      photos: [Buffer.from('any_photo')],
      size: 'SMALL',
      age: 'CUB',
      activity_Level: 'HIGH',
      indepedency_Level: 'HIGH',
      ambient: 'OUTDOOR',
      organization_Id: 'organization-01',
    })

    expect(animal.id).toEqual(expect.any(String))
  })

  it('should not allow creating an animal with a non-existent organization', async () => {
    await expect(() =>
      sut.execute({
        name: 'dog',
        description: 'any_description',
        requirements: ['any_requirement'],
        photos: [Buffer.from('any_photo')],
        size: 'SMALL',
        age: 'CUB',
        activity_Level: 'HIGH',
        indepedency_Level: 'HIGH',
        ambient: 'OUTDOOR',
        organization_Id: 'organization-02',
      }),
    ).rejects.toBeInstanceOf(ResourcesNotFoundError)
  })
})
