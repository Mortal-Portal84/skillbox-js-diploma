import { Card, ModalWindow, PaginationButton } from './components'
// @ts-ignore
import JustValidate from 'just-validate'

import { getGoods, getParams, setParamsFromObject, updateParam } from '../api'
import { INITIAL_PARAMS } from '../constants'
import { Lamp, OrderBy, Warehouse } from '../models'

import '../scss/style.scss'

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
  },
])
  .addField(document.querySelector('#email'), [
    {
      rule: 'required',
      errorMessage: 'Введите вашу почту'
    },
    {
      rule: 'email',
      errorMessage: 'Почта введена неверно'
    },
  ])
  .addField(document.querySelector('#agree'), [
    {
      rule: 'required',
      errorMessage: 'Согласие обязательно',
    }
  ])
  .onSuccess((event: Event) => {
    event.preventDefault()

    if (!form) return

    fetch('https://httpbin.org/post', {
      method: 'POST',
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
        ModalWindow(error.message)
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
const paginationButtons = document.querySelectorAll('.catalog__pagination-link') as NodeListOf<HTMLButtonElement>
const lampsCountList = document.querySelectorAll('.custom-checkbox__count') as NodeListOf<HTMLSpanElement>

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

  paginationButtons[(params.top + params.skip) / params.top - 1].classList.add('active')
}

// Work with URL params
const updateTotalCount = async (): Promise<void> => {
  const { availability, availableOnly } = getParams()
  const goods = await getGoods({ availability, availableOnly })

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

  const goods= await getGoods(params)

  catalogList.replaceChildren()

  goods.value.forEach((good) => {
    catalogList.append(Card(good))
  })

  console.log(goods.count)

  const totalPage = Math.ceil(goods.count / params.top)
  paginationList.replaceChildren()

  for (let i = 1; i <= totalPage; i++) {
    const page = PaginationButton(i, true)
    paginationList.append(page)
  }
}

void refetch()

//Inputs
let activeTypes: Lamp[] = []

checkboxes.forEach((checkbox) => checkbox.addEventListener('change', () => {
  if (checkbox.checked) activeTypes.push(checkbox.value as Lamp)
  else activeTypes = activeTypes.filter((type) => type !== checkbox.value as Lamp)

  updateParam('type', activeTypes.join(','))

  void refetch()
}))

resetFiltersButton.addEventListener('click', () => {
  activeTypes = []
  checkboxes.forEach((checkbox) => checkbox.checked = false)
  updateParam('type', INITIAL_PARAMS.type.join(','))
  updateParam('availableOnly', String(INITIAL_PARAMS.availableOnly))
  // updateParam('orderBy', INITIAL_PARAMS.orderBy)
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

// const removeActiveClass = (index: number) => {
//   paginationButtons.forEach((button, idx) => {
//     if (index !== idx) button.classList.remove('active')
//   })
// }

// paginationButtons.forEach((button, index) => {
//   button.addEventListener('click', () => {
//     const value = String((Number(button.textContent) - 1) * Number(new URLSearchParams(window.location.search).get('top')))
//
//     updateParam('skip', value)
//
//     button.classList.add('active')
//
//     removeActiveClass(index)
//
//     void refetch()
//   })
// })
