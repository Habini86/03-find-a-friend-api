import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repository/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { InMemoryAnimalsRepository } from '@/repository/in-memory/in-memory-animals-repository'
import { env } from '@/env'
import { SearchAnimalsUseCase } from './search-animals'

let sut: SearchAnimalsUseCase
let organizationsRepository: InMemoryOrganizationsRepository
let animalsRepository: InMemoryAnimalsRepository

describe('Search Animal Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    animalsRepository = new InMemoryAnimalsRepository()
    sut = new SearchAnimalsUseCase(animalsRepository, organizationsRepository)

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

    await organizationsRepository.create({
      id: 'organization-02',
      name: 'JavaScript',
      address: 'any_address',
      cep: 'any_cep',
      city: 'city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password_Hash: await hash('123456', env.NUMBER_PASS_HASH),
    })
  })

  it('should be able to search for animals using specific query parameters', async () => {
    await animalsRepository.create({
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

    await animalsRepository.create({
      name: 'cat',
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

    const { animals } = await sut.execute({
      page: 1,
      query: {
        size: 'SMALL',
      },
    })

    expect(animals).toHaveLength(1)
    expect(animals).toEqual([
      expect.objectContaining({
        name: 'cat',
      }),
    ])
  })

  it('should be able to search for animals using specific city and state', async () => {
    await animalsRepository.create({
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

    await animalsRepository.create({
      name: 'cat',
      description: 'any_description',
      requirements: ['any_requirement'],
      photos: [Buffer.from('any_photo')],
      size: 'SMALL',
      age: 'CUB',
      activity_Level: 'HIGH',
      indepedency_Level: 'HIGH',
      ambient: 'OUTDOOR',
      organization_Id: 'organization-02',
    })

    const { animals } = await sut.execute({
      page: 1,
      city: 'any_city',
      state: 'any_state',
    })

    expect(animals).toHaveLength(1)
    expect(animals).toEqual([
      expect.objectContaining({
        name: 'dog',
      }),
    ])
  })

  it('should be able to search for animals using specific state', async () => {
    await animalsRepository.create({
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

    await animalsRepository.create({
      name: 'cat',
      description: 'any_description',
      requirements: ['any_requirement'],
      photos: [Buffer.from('any_photo')],
      size: 'SMALL',
      age: 'CUB',
      activity_Level: 'HIGH',
      indepedency_Level: 'HIGH',
      ambient: 'OUTDOOR',
      organization_Id: 'organization-02',
    })

    const { animals } = await sut.execute({
      page: 1,
      state: 'any_state',
    })

    expect(animals).toHaveLength(2)
  })

  it('should return an empty array when no animals match the search criteria for pagination', async () => {
    const { animals } = await sut.execute({
      page: 1,
    })

    expect(animals).toHaveLength(0)
  })
})
