import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
// @ts-ignore
import 'swiper/css'
// @ts-ignore
import 'swiper/css/navigation'

import type { Goods } from '../../models'
import { Card } from './Card/Card'

export const Slider = (sliderListItems: Goods[]) => {
  const swiper = new Swiper('.swiper', {
    modules: [Navigation],
    spaceBetween: 40,
    slidesPerView: 4,
    slidesPerGroup: 4,
    navigation: {
      nextEl: '.day-products__navigation-btn--next',
      prevEl: '.day-products__navigation-btn--prev'
    }
  })

  swiper.init()

  const sliderList = document.querySelector('.day-products__list')

  sliderList?.replaceChildren()

  sliderListItems.forEach((item) => {
    const sliderItem = Card(item)
    const cardWrapper= sliderItem.querySelector('.product-card')

    cardWrapper?.classList.add('product-card--small')
    sliderItem.classList.add('day-products__item', 'swiper-slide')

    sliderList?.append(sliderItem)
  })
}
