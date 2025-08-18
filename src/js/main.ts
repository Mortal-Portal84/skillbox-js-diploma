import { Basket, Card, ModalWindow, PaginationButton } from './components'
// @ts-ignore
import JustValidate from 'just-validate'

import { getGoods, getParams, setParamsFromObject, updateParam } from '../api'
import { INITIAL_PARAMS } from '../constants'
import { type Goods, Lamp, OrderBy, Warehouse } from '../models'

import '../scss/style.scss'
import { Slider } from './components/Slider.ts'

// Burger-menu's interactivity
const headerButtonMenu = document.querySelector('.header__catalog-btn')
const burgerMenu = document.querySelector('.main-menu')
const closeBurgerMenuBtn = document.querySelector('.main-menu__close')

headerButtonMenu?.addEventListener('click', () => {
  burgerMenu?.classList.add('main-menu--active')
})

closeBurgerMenuBtn?.addEventListener('click', () => {
  burgerMenu?.classList.remove('main-menu--active')
})

// City location chose
const cityListButton = document.querySelector('.location__city')
const locationCityName = document.querySelector('.location__city-name')
const locationCityList = document.querySelectorAll('.location__sublink')

cityListButton?.addEventListener('click', () => {
  cityListButton?.classList.toggle('location__city--active')
})

locationCityList.forEach((cityName) => {
  cityName.addEventListener('click', () => {
    if (!locationCityName) return

    locationCityName.textContent = cityName.textContent
    cityListButton?.classList.remove('location__city--active')
  })
})

// Accordion buttons
const accordionButtons = document.querySelectorAll('.accordion__btn')

accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    accordionButtons.forEach((currentButton) => {
      if (currentButton !== button) {
        currentButton.classList.remove('accordion__btn--active')
      }
    })

    button.classList.toggle('accordion__btn--active')
  })
})

// Form validation
const form: HTMLFormElement | null = document.querySelector('.questions__form')
const validator = new JustValidate(form)

validator.addField(document.querySelector('#name'), [
  {
    rule: 'required',
    errorMessage: 'Введите ваше имя'
  },
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'Минимальная длина три символа'
  },
  {
    rule: 'maxLength',
    value: 20,
    errorMessage: 'Максимальная длина двадцать символов'
  }
])
  .addField(document.querySelector('#email'), [
    {
      rule: 'required',
      errorMessage: 'Введите вашу почту'
    },
    {
      rule: 'email',
      errorMessage: 'Почта введена неверно'
    }
  ])
  .addField(document.querySelector('#agree'), [
    {
      rule: 'required',
      errorMessage: 'Согласие обязательно'
    }
  ])
  .onSuccess((event: Event) => {
    event.preventDefault()

    if (!form) return

    fetch('https://httpbin.org/post', {
      method: 'POST'
    })
      .then((response) => {
        if (response.ok) {
          ModalWindow('Благодарим за обращение!')
          form.reset()
        } else {
          throw new Error('Не удалось отправить обращение')
        }
      })
      .catch((error) => {
        ModalWindow(error.message, error)
      })
  })

// Selectors
const catalogList = document.querySelector('.catalog__list') as HTMLUListElement
const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.custom-checkbox__field')
const resetFiltersButton = document.querySelector('.catalog-form__reset') as HTMLButtonElement
const sortSelect = document.querySelector('.catalog__sort-select') as HTMLSelectElement
const citySelectButtons = document.querySelectorAll('.location__sublink') as NodeListOf<HTMLButtonElement>
const citySelectButton = document.querySelector('.location__city-name') as HTMLButtonElement
const inStockInput = document.getElementById('instock') as HTMLInputElement
const allItemInput = document.getElementById('all-item') as HTMLInputElement
const paginationList = document.querySelector('.catalog__pagination') as HTMLOListElement
const lampsCountList = document.querySelectorAll('.custom-checkbox__count') as NodeListOf<HTMLSpanElement>
const basketButton = document.querySelector('.header__user-btn') as HTMLButtonElement
const basketWrapper = document.querySelector('.header__user-item') as HTMLLIElement
let currentGoods: Goods[] = []
let goodsOfDayList: Goods[] = []
const { basket, addItem } = Basket()

const insertInputValues = (): void => {
  const params = getParams()

  checkboxes.forEach((checkbox) => {
    checkbox.checked = params.type.includes(checkbox.value)
  })

  inStockInput.checked = params.availableOnly
  allItemInput.checked = !params.availableOnly

  switch (params.orderBy) {
    case OrderBy.rating:
      sortSelect.value = 'rating-max'
      break
    case  OrderBy.priceAsc:
      sortSelect.value = 'price-min'
      break
    case OrderBy.priceDesc:
      sortSelect.value = 'price-max'
      break
    default:
      sortSelect.value = 'rating-max'
  }

  switch (params.availability) {
    case Warehouse.orenburg:
      citySelectButton.textContent = 'Оренбург'
      break
    case Warehouse.moscow:
      citySelectButton.textContent = 'Москва'
      break
    case Warehouse.saintPetersburg:
      citySelectButton.textContent = 'Санкт-Петербург'
      break
    default:
      citySelectButton.textContent = 'Оренбург'
  }
}

// Work with URL params
const updateTotalCount = async (): Promise<void> => {
  const { availability, availableOnly } = getParams()
  const goods = await getGoods({ availability, availableOnly })
  goodsOfDayList = goods.value.filter((item) =>
    item.goodsOfDay && item.availability[availability as keyof typeof Warehouse])

  console.log(goodsOfDayList)

  Slider(goodsOfDayList)

  const total: Record<Lamp, number> = {
    pendant: 0,
    ceiling: 0,
    overhead: 0,
    point: 0,
    nightlights: 0
  }

  goods.value.forEach((good) => {
    good.type.forEach((type) => {
      total[type] = total[type] + 1
    })
  })

  const totalList = Object.values(total)

  lampsCountList.forEach((item, index) => {
    item.textContent = String(totalList[index])
  })
}

const initialize = (): void => {
  if (!window.location.search) setParamsFromObject(INITIAL_PARAMS)

  void updateTotalCount()

  insertInputValues()
}

initialize()

const refetch = async (): Promise<void> => {
  const params = getParams()
  const goods = await getGoods(params)
  const totalPage = Math.ceil(goods.count / params.top)
  const currentPage = (params.top + params.skip) / params.top - 1
  currentGoods = goods.value

  catalogList.replaceChildren()
  paginationList.replaceChildren()

  setTimeout(() => {
    catalogList.append(...goods.value.map((good) => Card(good)))

    if (totalPage > 1)
      paginationList.append(
        ...new Array(totalPage)
          .fill(null)
          .map((_, index) => PaginationButton(index, currentPage === index, refetch))
      )
  }, 0)
}

void refetch()

//Inputs
let activeTypes: Lamp[] = []

checkboxes.forEach((checkbox) => checkbox.addEventListener('change', () => {
  if (checkbox.checked && checkbox.id !== 'agree') activeTypes.push(checkbox.value as Lamp)
  else activeTypes = activeTypes.filter((type) => type !== checkbox.value as Lamp)

  updateParam('type', activeTypes.join(','))

  void refetch()
}))

resetFiltersButton.addEventListener('click', () => {
  activeTypes = []
  checkboxes.forEach((checkbox) => checkbox.checked = false)
  updateParam('type', INITIAL_PARAMS.type.join(','))
  updateParam('availableOnly', String(INITIAL_PARAMS.availableOnly))
  updateParam('top', String(INITIAL_PARAMS.top))
  updateParam('skip', String(INITIAL_PARAMS.skip))

  insertInputValues()

  void refetch()
})

sortSelect.addEventListener('change', () => {
  switch (sortSelect.value) {
    case 'rating-max':
      updateParam('orderBy', 'rating desc')
      break
    case 'price-min':
      updateParam('orderBy', 'price asc')
      break
    case 'price-max':
      updateParam('orderBy', 'price desc')
      break
    default:
      updateParam('orderBy', 'rating desc')
  }

  void refetch()
})

citySelectButtons.forEach((button) => button.addEventListener('click', () => {
  switch (button.textContent) {
    case 'Оренбург':
      updateParam('availability', Warehouse.orenburg)
      break
    case 'Москва':
      updateParam('availability', Warehouse.moscow)
      break
    case 'Санкт-Петербург':
      updateParam('availability', Warehouse.saintPetersburg)
      break
    default:
      updateParam('availability', Warehouse.orenburg)
  }

  void updateTotalCount()

  void refetch()
}))

;[inStockInput, allItemInput].forEach((element) => {
  element.addEventListener('change', () => {
    updateParam('availableOnly', element.id === 'all-item' ? String(!element.checked) : String(element.checked))

    void updateTotalCount()

    void refetch()
  })
})

// Basket
basketWrapper.append(basket)

basketButton.addEventListener('click', () => {
  basket.classList.toggle('basket--active')
})

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement
  const button = target.closest<HTMLAnchorElement>('.product-card__link.btn.btn--icon')

  if (button) {
    event.preventDefault()
    const item = currentGoods.find((good) => good.id === Number(button.dataset.id))
    if (item) addItem(item)
  }
})
