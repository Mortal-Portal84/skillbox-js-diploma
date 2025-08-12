import type { Params } from '../models'

const encodeParams = (params: Params): Record<string, string> =>
  Object.fromEntries(Object.entries(params).map(([key, value]) =>
    Array.isArray(value)
      ? [key, value.join(',')]
      : [key, `${value}`]))

const decodeParams = (params: Record<string, string>): Params =>
  Object.fromEntries(Object.entries(params).map(([key, value]) =>
    key === 'type'
      ? [key, value
        ? value.split(',')
        : []]
      : [key, !isNaN(Number(value))
        ? +value
        : (value === 'true' || value === 'false')
          ? value === 'true'
          : value
      ]))

export const setParamsFromObject = (obj: Params): void => {
  const params = new URLSearchParams(encodeParams(obj))
  const newUrl = `${window.location.pathname}?${params.toString()}`
  history.replaceState({}, '', newUrl) // or pushState
}

export const updateParam = (key: string, value: string): void => {
  const params = new URLSearchParams(window.location.search)
  params.set(key, value)
  const newUrl = `${window.location.pathname}?${params.toString()}`
  history.replaceState({}, '', newUrl)
}

export const getParams = (): Params => {
  // Create a URLSearchParams instance from the current URL
  const params = new URLSearchParams(window.location.search)

// Convert all params to an object
  const obj = Object.fromEntries(params.entries())

  return decodeParams(obj)
}
