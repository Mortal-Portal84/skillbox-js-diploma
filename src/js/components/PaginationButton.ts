import { updateParam } from '../../api'

export const PaginationButton = (index: number, isActive: boolean, refetch: () => Promise<void>) => {
  const paginationListItem = document.createElement('li')
  const paginationButton = document.createElement('button')

  paginationListItem.className = 'catalog__pagination-item'
  paginationButton.textContent = String(index + 1)
  paginationButton.className = `catalog__pagination-link${isActive ? ' active' : ''}`

  paginationButton.addEventListener('click', () => {
    updateParam('skip', String(index * Number(new URLSearchParams(window.location.search).get('top'))))
    void refetch()
  })

  paginationListItem.appendChild(paginationButton)

  return paginationListItem
}
