export const getGoods = async () => {
  const response = await fetch('/src/data/data.json')

  if (!response.ok) {
    throw new Error('Ошибка загрузки данных')
  }

  return await response.json()
}
