type LampKind = "pendant"| "ceiling" | "nightlights" | "point" | "overhead"

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
  type: LampKind[]
  rating: number
  goodsOfDay: boolean
}

