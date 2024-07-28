import { PrismaOrganizationsRepository } from '@/repository/prisma/prisma-organizations-repository'
import { AuthenticateOrganizationUseCase } from '../authenticate-organization'

export function makeAuthenticateOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()

  const useCase = new AuthenticateOrganizationUseCase(organizationRepository)

  return useCase
}
