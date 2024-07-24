import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '../repository/organizations-repository'
import { compare } from 'bcryptjs'
import { InvalidCrendentialsError } from './errors/invalid-credentials-error'

interface AuthenticateOrganizationUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationUseCaseResponse {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {
    /* ... */
  }

  async execute({
    email,
    password,
  }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCrendentialsError()
    }

    const doesPasswordMatch = await compare(
      password,
      organization.password_Hash,
    )

    if (!doesPasswordMatch) {
      throw new InvalidCrendentialsError()
    }

    return {
      organization,
    }
  }
}
