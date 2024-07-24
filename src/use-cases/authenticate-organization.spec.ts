import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repository/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'
import { env } from '@/env'
import { AuthenticateOrganizationUseCase } from './authenticate-organization'
import { InvalidCrendentialsError } from './errors/invalid-credentials-error'

let sut: AuthenticateOrganizationUseCase
let organizationsRepository: InMemoryOrganizationsRepository

describe('Authenticate Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to authenticate a organization', async () => {
    const password = '123456'

    await organizationsRepository.create({
      name: 'JavaScript',
      address: 'any_address',
      cep: 'any_cep',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password_Hash: await hash(password, env.NUMBER_PASS_HASH),
    })

    const { organization } = await sut.execute({
      email: 'any_email',
      password,
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate organization with wrong password', async () => {
    const password = '123456'

    await organizationsRepository.create({
      name: 'JavaScript',
      address: 'any_address',
      cep: 'any_cep',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password_Hash: await hash(password, env.NUMBER_PASS_HASH),
    })

    await expect(() =>
      sut.execute({
        email: 'any_email',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCrendentialsError)
  })

  it('should be able to authenticate organization with wrong email', async () => {
    const password = '123456'

    await organizationsRepository.create({
      name: 'JavaScript',
      address: 'any_address',
      cep: 'any_cep',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password_Hash: await hash(password, env.NUMBER_PASS_HASH),
    })

    await expect(() =>
      sut.execute({
        email: 'wrong_email',
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCrendentialsError)
  })
})
