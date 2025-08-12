import type { Lamp } from './lamp.ts'

export const OrderBy = {
  rating: 'rating asc',
  priceAsc: 'price asc',
  priceDesc: 'price desc'
} as const

export type OrderBy = (typeof OrderBy)[keyof typeof OrderBy]

export const Warehouse = {
  moscow: 'moscow',
  orenburg: 'orenburg',
  saintPetersburg: 'saintPetersburg'
}

export type Warehouse = (typeof Warehouse)[keyof typeof Warehouse]

export type Params = {
  type: Lamp[],
  availability: Warehouse,
  availableOnly: boolean,
  orderBy: OrderBy,
  top: number,
  skip: number
}
