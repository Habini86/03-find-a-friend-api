import { Prisma, Animal } from '@prisma/client'
import { AnimalsRepository, findManyQuery } from '../animals-repository'
import { createId } from '@paralleldrive/cuid2'

export class InMemoryAnimalsRepository implements AnimalsRepository {
  public items: Animal[] = []

  async create(data: Prisma.AnimalUncheckedCreateInput) {
    const animal: Animal = {
      id: data.id ? data.id : createId(),
      name: data.name,
      description: data.description,
      requirements: data.requirements as string[],
      size: data.size,
      age: data.age,
      activity_Level: data.activity_Level,
      independency_Level: data.independency_Level,
      ambient: data.ambient,
      created_At: new Date(),
      organization_Id: data.organization_Id,
    }

    this.items.push(animal)

    return animal
  }

  async findById(id: string) {
    const animal = this.items.find((animal) => animal.id === id)

    if (!animal) return null

    return animal
  }

  async searchMany(
    page: number,
    query?: findManyQuery,
    organization_Id?: string[],
  ) {
    return this.items
      .filter((animal) => {
        let matchesQuery = true

        if (organization_Id) {
          matchesQuery = organization_Id.includes(animal.organization_Id)

          if (!matchesQuery) return false
        }

        if (query) {
          if (query.size) {
            matchesQuery = animal.size.includes(query.size.toString())

            if (!matchesQuery) return false
          }

          if (query.age) {
            matchesQuery = animal.age.includes(query.age.toString())

            if (!matchesQuery) return false
          }

          if (query.activity_Level) {
            matchesQuery = animal.activity_Level.includes(
              query.activity_Level.toString(),
            )

            if (!matchesQuery) return false
          }

          if (query.independency_Level) {
            matchesQuery = animal.independency_Level.includes(
              query.independency_Level.toString(),
            )

            if (!matchesQuery) return false
          }

          if (query.ambient) {
            matchesQuery = animal.ambient.includes(query.ambient.toString())

            if (!matchesQuery) return false
          }
        }

        return matchesQuery
      })
      .slice((page - 1) * 20, page * 20)
  }
}
