import { PrismaOrganizationsRepository } from '@/repository/prisma/prisma-organizations-repository'
import { PrismaAnimalsRepository } from '@/repository/prisma/prisma-animals-repository'
import { SearchAnimalsUseCase } from '../search-animals'

export function makeSearchAnimalsUseCase() {
  const animalRepository = new PrismaAnimalsRepository()
  const organizationRepository = new PrismaOrganizationsRepository()

  const useCase = new SearchAnimalsUseCase(
    animalRepository,
    organizationRepository,
  )

  return useCase
}
