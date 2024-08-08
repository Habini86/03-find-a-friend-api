import { Prisma } from '@prisma/client'
import { AnimalsRepository, findManyQuery } from '../animals-repository'
import { prisma } from '@/lib/prisma'

export class PrismaAnimalsRepository implements AnimalsRepository {
  async create(data: Prisma.AnimalUncheckedCreateInput) {
    const animals = await prisma.animal.create({
      data,
    })

    return animals
  }

  async findById(id: string) {
    const animal = await prisma.animal.findUnique({
      where: {
        id,
      },
    })

    return animal
  }

  async searchMany(
    page: number,
    query?: findManyQuery,
    organization_Id?: string[],
  ) {
    const animals = await prisma.animal.findMany({
      where: {
        AND: [
          query?.size ? { size: query.size } : {},
          query?.age ? { age: query.age } : {},
          query?.activity_Level ? { activity_Level: query.activity_Level } : {},
          query?.independency_Level
            ? { independency_Level: query.independency_Level }
            : {},
          query?.ambient ? { ambient: query.ambient } : {},
          organization_Id ? { organization_Id: { in: organization_Id } } : {},
        ],
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return animals
  }
}
