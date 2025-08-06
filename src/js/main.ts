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
