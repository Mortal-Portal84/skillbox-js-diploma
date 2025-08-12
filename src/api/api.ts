import { type Goods, type Params, Warehouse } from '../models'
import { INITIAL_PARAMS } from '../constants'

export const getGoods = async (params: Partial<Params>): Promise<Goods[]> => {
  const response = await fetch('/src/data/data.json')

  if (!response.ok) {
    throw new Error('Ошибка загрузки данных')
  }

  const goods: Goods[] = await response.json()

  let result: Goods[] = [...goods]

  if (params.availability) result = result.filter((item) =>
    params.availableOnly
      ? item.availability[params.availability as keyof typeof Warehouse]
      : true
  )

  if (params.type?.length) result = result.filter((item) =>
    item.type.some((type) => params.type?.includes(type)))

  if (params.orderBy) {
    const [orderBy, orderDirection] = params.orderBy.split(' ') || INITIAL_PARAMS.orderBy.split(' ')

    if (orderBy === 'rating') {
      result.sort((a, b) => orderDirection === 'desc'
        ? b.rating - a.rating
        : a.rating - b.rating
      )
    } else if (orderBy === 'price') {
      result.sort((a, b) => orderDirection === 'desc'
        ? b.price.new - a.price.new
        : a.price.new - b.price.new
      )
    }
  }

  if (params.top || params.skip) result = result.slice(params.skip, (params.skip ?? 0) + (params.top ?? 0))

  return result
}
