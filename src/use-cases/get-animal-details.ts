import { Animal, Organization } from '@prisma/client'
import { AnimalsRepository } from '@/repository/animals-repository'
import { OrganizationsRepository } from '@/repository/organizations-repository'
import ResourcesNotFoundError from './errors/resources-not-found-error'

interface GetAnimalDetailsUseCaseRequest {
  id: string
}

interface GetAnimalDetailsUseCaseResponse {
  animal: Animal
  organization: Organization
}

export class GetAnimalDetailsUseCase {
  constructor(
    private animalsRepository: AnimalsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {
    /* ... */
  }

  async execute({
    id,
  }: GetAnimalDetailsUseCaseRequest): Promise<GetAnimalDetailsUseCaseResponse> {
    const animal = await this.animalsRepository.findById(id)

    if (!animal) {
      throw new ResourcesNotFoundError()
    }

    const organization = await this.organizationsRepository.findById(
      animal.organization_Id,
    )

    if (!organization) {
      throw new ResourcesNotFoundError()
    }

    return {
      animal,
      organization,
    }
  }
}
