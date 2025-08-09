import { TooltipItem } from './parts/TooltipItem.ts'
import type { Goods } from '../../../models'
import { createSvgIcon } from '../../utils'

export const Card = (goods: Goods) => {
  const cardListItem = document.createElement('li')
  const cardProduct = document.createElement('div')
  const cardProductWrapper = document.createElement('div')
  const cardImg = document.createElement('img')
  const cardOperations = document.createElement('div')
  const basketBtn = document.createElement('a')
  const basketBtnText = document.createElement('span')
  const basketBtnIco = createSvgIcon('icon-basket', 24, 24)
  const detailsBtn = document.createElement('a')
  const detailsBtnText = document.createElement('span')
  const cardInfo = document.createElement('div')
  const cardTitle = document.createElement('h2')
  const oldPrice = document.createElement('span')
  const oldPriceValue = document.createElement('span')
  const oldPriceCurrency = document.createElement('span')
  const price = document.createElement('span')
  const priceValue = document.createElement('span')
  const priceCurrency = document.createElement('span')
  const tooltip = document.createElement('div')
  const tooltipButton = document.createElement('button')
  const tooltipIcon = createSvgIcon('icon-i', 5, 10)
  const tooltipContent = document.createElement('div')
  const tooltipText = document.createElement('span')
  const tooltipList = document.createElement('ul')
  const tooltipItemMoscow = TooltipItem('Москва', goods.availability.moscow)
  const tooltipItemOrenburg = TooltipItem('Оренбург', goods.availability.orenburg)
  const tooltipItemStPeterburg = TooltipItem('Санкт-Петербург', goods.availability.saintPetersburg)

  cardListItem.className = 'catalog__item'
  cardProduct.className = 'product-card'
  cardProductWrapper.className = 'product-card__visual'
  cardImg.className = 'product-card__img'
  cardOperations.className = 'product-card__more'
  basketBtn.className = 'product-card__link btn btn--icon'
  detailsBtn.className = 'product-card__link btn btn--secondary'
  detailsBtnText.className = 'btn__text'
  cardInfo.className = 'product-card__info'
  cardTitle.className = 'product-card__title'
  oldPrice.className = 'product-card__old'
  oldPriceValue.className = 'product-card__old-number'
  oldPriceCurrency.className = 'product-card__old-add'
  price.className = 'product-card__price'
  priceValue.className = 'product-card__price-number'
  priceCurrency.className = 'product-card__price-add'
  tooltip.className = 'product-card__tooltip tooltip'
  tooltipButton.className = 'tooltip__btn'
  tooltipIcon.classList.add('tooltip__icon')
  tooltipContent.className = 'tooltip__content'
  tooltipText.className = 'tooltip__text'
  tooltipList.className = 'tooltip__list'

  cardImg.src = goods.image
  cardImg.width = 436
  cardImg.height = 290
  cardImg.alt = 'Изображение товара'

  detailsBtn.href = '#'
  detailsBtnText.textContent = 'Подробнее'

  basketBtn.href = '#'
  basketBtnText.textContent = 'В корзину'

  cardTitle.textContent = goods.name
  oldPriceCurrency.textContent = '₽'
  priceCurrency.textContent = '₽'
  oldPriceValue.textContent = `${String(goods.price.old.toLocaleString('ru-RU'))} `
  priceValue.textContent = `${String(goods.price.new.toLocaleString('ru-RU'))} `
  tooltipText.textContent = 'Наличие товара по городам:'

  cardListItem.appendChild(cardProduct)
  cardProduct.append(cardProductWrapper, cardInfo)
  cardProductWrapper.append(cardImg, cardOperations)
  cardOperations.append(basketBtn, detailsBtn)
  basketBtn.append(basketBtnText, basketBtnIco)
  detailsBtn.append(detailsBtnText)
  cardInfo.append(cardTitle, oldPrice, price, tooltip)
  oldPrice.append(oldPriceValue, oldPriceCurrency)
  price.append(priceValue, priceCurrency)
  tooltip.append(tooltipButton, tooltipContent)
  tooltipButton.append(tooltipIcon)
  tooltipContent.append(tooltipText, tooltipList)
  tooltipList.append(tooltipItemMoscow, tooltipItemOrenburg, tooltipItemStPeterburg)

  return cardListItem
}
