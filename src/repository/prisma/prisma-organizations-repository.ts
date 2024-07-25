import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: { id },
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: { email },
    })

    return organization
  }

  async findByCityAndState(state: string, city?: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        state,
        city,
      },
    })

    return organizations.map((organization) => organization.id)
  }
}
