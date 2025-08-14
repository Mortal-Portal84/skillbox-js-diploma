import { updateParam } from '../../api'

export const PaginationButton = (index: number, isActive: boolean, refetch: () => Promise<void>) => {
  const paginationListItem = document.createElement('li')
  paginationListItem.className = 'catalog__pagination-item'

  const paginationButton = document.createElement('button')
  paginationButton.textContent = String(index + 1)
  paginationButton.className = `catalog__pagination-link${isActive ? ' active' : ''}`

  // const removeActiveClass = (idx: number) => {
  //     if (index !== idx) paginationButton.classList.remove('active')
  // }

  paginationButton.addEventListener('click', () => {
    updateParam('skip', String(index * Number(new URLSearchParams(window.location.search).get('top'))))
    // removeActiveClass(index)
    void refetch()
  })

  paginationListItem.appendChild(paginationButton)

  return paginationListItem
}
