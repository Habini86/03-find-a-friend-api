import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '../repository/organizations-repository'
import { hash } from 'bcryptjs'
import { env } from '@/env'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterOrganizationUseCaseRequest {
  name: string
  address: string
  cep: string
  city: string
  state: string
  phone: string
  email: string
  password: string
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {
    /* ... */
  }

  async execute({
    name,
    address,
    cep,
    city,
    state,
    phone,
    email,
    password,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      address,
      cep,
      city,
      state,
      phone,
      email,
      password_Hash: await hash(password, env.NUMBER_PASS_HASH),
    })

    return {
      organization,
    }
  }
}
