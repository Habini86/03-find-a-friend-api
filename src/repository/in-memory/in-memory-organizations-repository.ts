import { Prisma, Organization } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { createId } from '@paralleldrive/cuid2'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: data.id ? data.id : createId(),
      name: data.name,
      address: data.address,
      cep: data.cep,
      city: data.city,
      state: data.state,
      phone: data.phone,
      email: data.email,
      password_Hash: data.password_Hash,
      created_At: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findById(id: string) {
    const organization = this.items.find(
      (organization) => organization.id === id,
    )

    if (!organization) return null

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find(
      (organization) => organization.email === email,
    )

    if (!organization) return null

    return organization
  }

  async findByCityAndState(state: string, city?: string) {
    const organization = this.items.filter((organization) => {
      if (city) {
        return organization.city === city && organization.state === state
      }

      return organization.state === state
    })

    return organization.map((organization) => organization.id)
  }
}
