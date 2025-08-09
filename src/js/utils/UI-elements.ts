export const createSvgIcon = (iconId: string, width: number, height: number) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', String(width))
  svg.setAttribute('height', String(height))
  svg.setAttribute('aria-hidden', 'true')

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `./src/images/sprite.svg#${iconId}`)
  svg.appendChild(use)

  return svg
}
