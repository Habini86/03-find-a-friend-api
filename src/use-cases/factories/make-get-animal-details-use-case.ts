import { PrismaOrganizationsRepository } from '@/repository/prisma/prisma-organizations-repository'
import { PrismaAnimalsRepository } from '@/repository/prisma/prisma-animals-repository'
import { GetAnimalDetailsUseCase } from '../get-animal-details'

export function makeGetAnimalDetailsUseCase() {
  const animalRepository = new PrismaAnimalsRepository()
  const organizationRepository = new PrismaOrganizationsRepository()

  const useCase = new GetAnimalDetailsUseCase(
    animalRepository,
    organizationRepository,
  )

  return useCase
}
