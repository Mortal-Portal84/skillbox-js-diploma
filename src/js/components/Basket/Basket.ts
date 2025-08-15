import type { Goods } from '../../../models'
import { BasketItem } from './parts/BasketItem.ts'

export const Basket = () => {
  const basketCounter = document.querySelector('.header__user-count') as HTMLSpanElement
  const basket = document.createElement('div')
  const basketListElement = document.createElement('ul')
  const basketOrderButton = document.createElement('a')
  const emptyBasketElement = document.createElement('div')
  let basketList: Goods[] = [
    {
      id: 1,
      name: 'Потолочная люстра Ornella A4059PL-4AB (Artelamp)',
      price: {
        new: 11540,
        old: 15300
      },
      image: 'src/images/item-1.png',
      availability: {
        moscow: 0,
        orenburg: 20,
        saintPetersburg: 17
      },
      type: ['pendant', 'nightlights'],
      rating: 30,
      goodsOfDay: true
    },
    {
      id: 2,
      name: 'Потолочная люстра Ornella A4059PL-4AB (Artelamp)',
      price: {
        new: 10540,
        old: 17300
      },
      image: 'src/images/item-2.png',
      availability: {
        moscow: 11,
        orenburg: 0,
        saintPetersburg: 0
      },
      type: ['pendant', 'nightlights'],
      rating: 450,
      goodsOfDay: false
    },
    {
      id: 3,
      name: 'Потолочная люстра Ornella A4059PL-4AB (Artelamp)',
      price: {
        new: 14555,
        old: 22300
      },
      image: 'src/images/item-3.png',
      availability: {
        moscow: 0,
        orenburg: 20,
        saintPetersburg: 17
      },
      type: ['pendant', 'overhead', 'point'],
      rating: 11,
      goodsOfDay: true
    }
  ]
  let count = basketList.length

  basket.className = 'header__basket basket'
  basketListElement.className = 'basket__list'
  emptyBasketElement.className = 'basket__empty-block'
  basketOrderButton.className = 'basket__link btn'
  basketOrderButton.href = '#'
  basketOrderButton.textContent = 'Перейти к оформлению'
  emptyBasketElement.textContent = 'Корзина пока пуста'
  basketCounter.textContent = String(count)

  basket.append(basketListElement, basketOrderButton)

  const handleDeleteItem = (id: string, element: HTMLElement) => {
    basketList = basketList.filter((item) => item.id !== Number(id))
    element.remove()
    count = basketList.length
    basketCounter.textContent = String(count)

    if (!basketList.length) {
      basket.append(emptyBasketElement)
      basketOrderButton.remove()
    }
  }

  if (basketList.length) {
    emptyBasketElement.remove()
    basketList.forEach((item) => {
      const basketItem = BasketItem(item, () => {
        handleDeleteItem(String(item.id), basketItem)
      })

      basketListElement.append(basketItem)
    })
  } else {
    basket.append(emptyBasketElement)
  }

  return basket
}
