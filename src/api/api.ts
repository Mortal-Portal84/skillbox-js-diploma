import { type Goods, type Params, Warehouse } from '../models'
import { INITIAL_PARAMS } from '../constants'

const DELAY = 1_000

export const getGoods = async (params: Partial<Params>): Promise<{ value: Goods[]; count: number }> =>
  new Promise((resolve) => {
    setTimeout(async () => {
      const response = await fetch('/src/data/data.json')

      if (!response.ok) {
        throw new Error('Ошибка загрузки данных')
      }

      const goods: Goods[] = await response.json()

      let value: Goods[] = [...goods]

      if (params.availability) value = value.filter((item) =>
        params.availableOnly
          ? item.availability[params.availability as keyof typeof Warehouse]
          : true
      )

      if (params.type?.length) value = value.filter((item) =>
        item.type.some((type) => params.type?.includes(type)))

      if (params.orderBy) {
        const [orderBy, orderDirection] = params.orderBy.split(' ') || INITIAL_PARAMS.orderBy.split(' ')

        if (orderBy === 'rating') {
          value.sort((a, b) => orderDirection === 'desc'
            ? b.rating - a.rating
            : a.rating - b.rating
          )
        } else if (orderBy === 'price') {
          value.sort((a, b) => orderDirection === 'desc'
            ? b.price.new - a.price.new
            : a.price.new - b.price.new
          )
        }
      }

      const count: number = value.length

      if (params.top || params.skip) value = value.slice(params.skip, (params.skip ?? 0) + (params.top ?? 0))

      resolve({ value, count })
    }, DELAY)
  })


