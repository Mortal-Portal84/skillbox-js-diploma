import '../scss/style.scss'

const headerButtonMenu = document.querySelector('.header__catalog-btn')
const burgerMenu = document.querySelector('.main-menu')
const closeBurgerMenuBtn = document.querySelector('.main-menu__close')

headerButtonMenu?.addEventListener('click', () => {
  burgerMenu?.classList.add('main-menu--active')
})

closeBurgerMenuBtn?.addEventListener('click', () => {
  burgerMenu?.classList.remove('main-menu--active')
})

document.addEventListener('click', (event) => {
  const isClickInsideMenu = burgerMenu?.contains(event.target)
  const isClickOnButton = headerButtonMenu?.contains(event.target)

  if (!isClickInsideMenu && !isClickOnButton) {
    burgerMenu?.classList.remove('main-menu--active')
  }
})
