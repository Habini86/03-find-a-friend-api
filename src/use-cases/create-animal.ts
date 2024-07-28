import {
  Animal,
  Size,
  Age,
  ActivityLevel,
  IndependencyLevel,
  Ambient,
} from '@prisma/client'
import { AnimalsRepository } from '@/repository/animals-repository'
import { OrganizationsRepository } from '@/repository/organizations-repository'
import ResourcesNotFoundError from './errors/resources-not-found-error'

interface CreateAnimalUseCaseRequest {
  name: string
  description: string
  requirements: string[]
  photos: Buffer[]
  size: Size
  age: Age
  activity_Level: ActivityLevel
  independency_Level: IndependencyLevel
  ambient: Ambient
  organization_Id: string
}

interface CreateAnimalUseCaseResponse {
  animal: Animal
}

export class CreateAnimalUseCase {
  constructor(
    private animalsRepository: AnimalsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {
    /* ... */
  }

  async execute({
    name,
    description,
    requirements,
    photos,
    size,
    age,
    activity_Level,
    independency_Level,
    ambient,
    organization_Id,
  }: CreateAnimalUseCaseRequest): Promise<CreateAnimalUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organization_Id)

    if (!organization) {
      throw new ResourcesNotFoundError()
    }

    const animal = await this.animalsRepository.create({
      name,
      description,
      requirements,
      photos,
      size,
      age,
      activity_Level,
      independency_Level,
      ambient,
      organization_Id,
    })

    return {
      animal,
    }
  }
}
