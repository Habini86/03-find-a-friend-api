import { PrismaOrganizationsRepository } from '@/repository/prisma/prisma-organizations-repository'
import { RegisterOrganizationUseCase } from '../register-organization'

export function makeRegisterOrganizationUseCase() {
  const organizationRepository = new PrismaOrganizationsRepository()

  const useCase = new RegisterOrganizationUseCase(organizationRepository)

  return useCase
}
