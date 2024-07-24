import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repository/in-memory/in-memory-organizations-repository'
import { RegisterOrganizationUseCase } from './register-organization'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let sut: RegisterOrganizationUseCase
let organizationsRepository: InMemoryOrganizationsRepository

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })

  it('should be able to register a new organization', async () => {
    const password = '123456'

    const { organization } = await sut.execute({
      name: 'JavaScript',
      address: 'any_address',
      cep: 'any_cep',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password,
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it("should be able to hash the organization's password during the registration process", async () => {
    const password = '123456'

    const { organization } = await sut.execute({
      name: 'JavaScript',
      address: 'any_address',
      cep: 'any_cep',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password,
    })

    const isPasswordCorrectHash = await compare(
      password,
      organization.password_Hash,
    )

    expect(isPasswordCorrectHash).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const password = '123456'

    await sut.execute({
      name: 'JavaScript',
      address: 'any_address',
      cep: 'any_cep',
      city: 'any_city',
      state: 'any_state',
      phone: 'any_phone',
      email: 'any_email',
      password,
    })

    await expect(() =>
      sut.execute({
        name: 'JavaScript',
        address: 'any_address',
        cep: 'any_cep',
        city: 'any_city',
        state: 'any_state',
        phone: 'any_phone',
        email: 'any_email',
        password,
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
