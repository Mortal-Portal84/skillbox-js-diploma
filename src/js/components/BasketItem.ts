import type { Goods } from '../../models'
import { createSvgIcon } from '../utils'

export const BasketItem = (item: Partial<Goods>) => {
  const basketItem = document.createElement('li')
  const basketImgWrapper = document.createElement('div')
  const basketImg = document.createElement('img')
  const basketName = document.createElement('span')
  const basketPrice = document.createElement('span')
  const basketDeleteItemButton = document.createElement('button')
  const basketItemCloseIcon = createSvgIcon('icon-close', 24, 24)

  basketItem.className = 'basket__item'
  basketImgWrapper.className = 'basket__img'
  basketName.className = 'basket__name'
  basketDeleteItemButton.className = 'basket__item-close'
  basketPrice.className = 'basket__price'
  basketItemCloseIcon.classList.add('main-menu__icon')

  basketImg.src = item.image as string
  basketImg.height = 60
  basketImg.width = 60
  basketImg.alt = "Фотография товара"
  basketName.textContent = item.name as string
  basketPrice.textContent = String(item.price?.new)

  basketItem.append(basketImgWrapper, basketName, basketPrice, basketDeleteItemButton)
  basketImgWrapper.append(basketImg)
  basketDeleteItemButton.append(basketItemCloseIcon)

  return basketItem
}
