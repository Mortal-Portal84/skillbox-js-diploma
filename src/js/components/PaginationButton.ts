import { updateParam } from '../../api'

export const PaginationButton = (index: number, isActive: boolean) => {
  const paginationListItem = document.createElement('li')
  const paginationButton = document.createElement('button')

  paginationListItem.className = 'catalog__pagination-item'
  paginationButton.className = 'catalog__pagination-link'
  paginationButton.textContent = String(index)

  paginationListItem.appendChild(paginationButton)


  if (index === 1) {
    paginationButton.classList.add('active')
  }

  paginationButton.addEventListener('click', () => {
    const value = String((Number(paginationButton.textContent) - 1) * Number(new URLSearchParams(window.location.search).get('top')))

    updateParam('skip', value)

    if (isActive) paginationButton.classList.add('active')
  })

  return paginationListItem
}
