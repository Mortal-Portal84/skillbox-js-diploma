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

// Close burger menu on clock to any empty area

// document.addEventListener('click', (event) => {
//   const target = event.target as HTMLElement;
//   const isInsideContent = document.querySelector('.main-menu__wrapper')?.contains(target)
//   const isClickOnButton = headerButtonMenu?.contains(target)
//
//   if (!isInsideContent && !isClickOnButton) {
//     burgerMenu?.classList.remove('main-menu--active')
//   }
// })
