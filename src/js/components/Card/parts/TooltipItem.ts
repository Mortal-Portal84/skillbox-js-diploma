export const TooltipItem = (city: string, value: number) => {
  const tooltipItem = document.createElement('li')
  const tooltipText = document.createElement('span')
  const tooltipValue = document.createElement('span')

  tooltipItem.className = 'tooltip__item'
  tooltipText.className = 'tooltip__text'
  tooltipValue.className = 'tooltip__count'

  tooltipText.textContent = `${city} :`
  tooltipValue.textContent = String(value)

  tooltipItem.appendChild(tooltipText)
  tooltipText.appendChild(tooltipValue)

  return tooltipItem
}
