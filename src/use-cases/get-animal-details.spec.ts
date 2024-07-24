import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repository/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { InMemoryAnimalsRepository } from '@/repository/in-memory/in-memory-animals-repository'
import { env } from '@/env'
import { GetAnimalDetailsUseCase } from './get-animal-details'
import ResourcesNotFoundError from './errors/resources-not-found-error'

let sut: GetAnimalDetailsUseCase
let organizationsRepository: InMemoryOrganizationsRepository
let animalsRepository: InMemoryAnimalsRepository

describe('Get Animal Details Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    animalsRepository = new InMemoryAnimalsRepository()
    sut = new GetAnimalDetailsUseCase(
      animalsRepository,
      organizationsRepository,
    )

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

  it('should be able to get animal details', async () => {
    await animalsRepository.create({
      id: 'animal-01',
      name: 'dog',
      description: 'any_description',
      requirements: ['any_requirement'],
      photos: [Buffer.from('any_photo')],
      size: 'MEDIUM',
      age: 'CUB',
      activity_Level: 'HIGH',
      indepedency_Level: 'HIGH',
      ambient: 'OUTDOOR',
      organization_Id: 'organization-01',
    })

    const { animal, organization } = await sut.execute({
      id: 'animal-01',
    })

    expect(animal).toEqual(
      expect.objectContaining({
        name: 'dog',
      }),
    )

    expect(organization).toEqual(
      expect.objectContaining({
        name: 'JavaScript',
      }),
    )
  })

  it('should not be able to get animal details with an incorrect animal ID', async () => {
    await expect(() =>
      sut.execute({
        id: 'animal-01',
      }),
    ).rejects.toBeInstanceOf(ResourcesNotFoundError)
  })

  it('should not be able to get animal details with an incorrect organization ID', async () => {
    await animalsRepository.create({
      id: 'animal-01',
      name: 'dog',
      description: 'any_description',
      requirements: ['any_requirement'],
      photos: [Buffer.from('any_photo')],
      size: 'MEDIUM',
      age: 'CUB',
      activity_Level: 'HIGH',
      indepedency_Level: 'HIGH',
      ambient: 'OUTDOOR',
      organization_Id: 'organization-02',
    })

    await expect(() =>
      sut.execute({
        id: 'animal-01',
      }),
    ).rejects.toBeInstanceOf(ResourcesNotFoundError)
  })
})
