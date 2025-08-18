import type { Goods } from '../../../models'
import { BasketItem } from './parts/BasketItem'

export const Basket = () => {
  const basketCounter = document.querySelector('.header__user-count') as HTMLSpanElement
  const basket = document.createElement('div')
  const basketListElement = document.createElement('ul')
  const basketOrderButton = document.createElement('a')
  const emptyBasketElement = document.createElement('div')
  let basketList: Goods[] = []

  const handleUpdateCounter = () => {
    basketCounter.textContent = String(basketList.length)
  }

  const handleDeleteItem = (id: number, element: HTMLElement) => {
    basketList = basketList.filter((item) => item.id !== id)

    element.remove()
    handleUpdateCounter()

    if (!basketList.length) {
      basket.append(emptyBasketElement)
      basketOrderButton.remove()
    }
  }

  const renderList = () => {
    basketListElement.replaceChildren()

    if (basketList.length) {
      emptyBasketElement.remove()

      basketList.forEach((item) => {
        const basketItem = BasketItem(item, () => handleDeleteItem(item.id, basketItem))
        basketListElement.append(basketItem)
      })

      basket.append(basketOrderButton)
    } else {
      basket.append(emptyBasketElement)
      basketOrderButton.remove()
    }
  }

  const addItem = (item: Goods) => {
    basketList.push(item)
    console.log(basketList)
    handleUpdateCounter()
    renderList()
  }

  basket.className = 'header__basket basket'
  basketListElement.className = 'basket__list'
  emptyBasketElement.className = 'basket__empty-block'
  basketOrderButton.className = 'basket__link btn'
  basketOrderButton.href = '#'
  basketOrderButton.textContent = 'Перейти к оформлению'
  emptyBasketElement.textContent = 'Корзина пока пуста'

  basket.append(basketListElement, emptyBasketElement)

  return { basket, addItem }
}

