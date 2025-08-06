export const ModalWindow = (text: string) => {
  const body = document.body

  const modalWindow = document.createElement('dialog')
  const windowText = document.createElement('p')
  const closeButton = document.createElement('button')

  modalWindow.id = 'modal'
  modalWindow.className = 'modal-window'
  windowText.className = 'modal-window__text'
  closeButton.className = 'modal-window__close-button'

  windowText.textContent = text
  closeButton.textContent = '×'

  closeButton.addEventListener('click', () => {
    modalWindow.remove()
  })

  modalWindow.append(windowText, closeButton)
  body?.append(modalWindow)

  modalWindow.showModal()
}
