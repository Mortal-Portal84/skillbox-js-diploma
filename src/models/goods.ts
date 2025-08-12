import type { Lamp } from './lamp.ts'

export type Goods = {
  id: number
  name: string
  price: {
    new: number
    old: number
  }
  image: string
  availability: {
    moscow: number
    orenburg: number
    saintPetersburg: number
  }
  type: Lamp[]
  rating: number
  goodsOfDay: boolean
}

