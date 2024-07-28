import { PrismaOrganizationsRepository } from '@/repository/prisma/prisma-organizations-repository'
import { CreateAnimalUseCase } from '../create-animal'
import { PrismaAnimalsRepository } from '@/repository/prisma/prisma-animals-repository'

export function makeCreateAnimalUseCase() {
  const animalRepository = new PrismaAnimalsRepository()
  const organizationRepository = new PrismaOrganizationsRepository()

  const useCase = new CreateAnimalUseCase(
    animalRepository,
    organizationRepository,
  )

  return useCase
}
