import {
  Prisma,
  Animal,
  Size,
  Age,
  ActivityLevel,
  IndependencyLevel,
  Ambient,
} from '@prisma/client'

export interface findManyQuery {
  size?: Size
  age?: Age
  activity_Level?: ActivityLevel
  independency_Level?: IndependencyLevel
  ambient?: Ambient
}

export interface AnimalsRepository {
  create(data: Prisma.AnimalUncheckedCreateInput): Promise<Animal>
  findById(id: string): Promise<Animal | null>
  searchMany(
    page: number,
    query?: findManyQuery,
    organization_Id?: string[],
  ): Promise<Animal[]>
}
