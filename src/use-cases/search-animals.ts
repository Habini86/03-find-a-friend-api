import { Animal } from '@prisma/client'
import {
  AnimalsRepository,
  findManyQuery,
} from '@/repository/animals-repository'
import { OrganizationsRepository } from '@/repository/organizations-repository'

interface SearchAnimalsUseCaseRequest {
  page: number
  query?: findManyQuery
  city?: string
  state?: string
}

interface SearchAnimalsUseCaseResponse {
  animals: Animal[]
}

export class SearchAnimalsUseCase {
  constructor(
    private animalsRepository: AnimalsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {
    /* ... */
  }

  async execute({
    query,
    page,
    city,
    state,
  }: SearchAnimalsUseCaseRequest): Promise<SearchAnimalsUseCaseResponse> {
    let organizationIds: string[] | undefined

    if ((city && state) || state) {
      organizationIds = await this.organizationsRepository.findByCityAndState(
        state,
        city,
      )
    }

    const animals = await this.animalsRepository.searchMany(
      page,
      query,
      organizationIds,
    )

    return {
      animals,
    }
  }
}
