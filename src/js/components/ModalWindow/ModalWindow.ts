import { ResponseError } from './parts/ResponseError'
import { ResponseOk } from './parts/ResponseOk'

export const ModalWindow = (title: string, isError: boolean = false) => {
  const body = document.body

  const modalWindow = document.createElement('dialog')
  const windowTitle = document.createElement('h2')
  const windowText = document.createElement('p')
  const closeButton = document.createElement('button')
  const modalIcon = document.createElement('svg')

  modalWindow.id = 'modal'
  modalWindow.className = 'modal-window'
  windowTitle.className = 'modal-window__title'
  windowText.className = 'modal-window__text'
  closeButton.className = 'modal-window__close-button'

  windowTitle.textContent = title
  closeButton.textContent = '×'
  modalIcon.innerHTML = isError ? ResponseError : ResponseOk

  windowText.textContent = isError
    ? 'Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — свяжитесь со службой поддержки'
    : 'Мы получили вашу заявку и свяжемся с вами в ближайшее время'

  closeButton.addEventListener('click', () => {
    modalWindow.remove()
  })

  modalWindow.append(modalIcon, windowTitle, windowText, closeButton)
  body?.append(modalWindow)

  modalWindow.showModal()
}
