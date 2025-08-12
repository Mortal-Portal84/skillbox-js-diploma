export const Lamp = {
  pendant: 'pendant',
  ceiling: 'ceiling',
  overhead: 'overhead',
  point: 'point',
  nightlights: 'nightlights'
}

export type Lamp = (typeof Lamp)[keyof typeof Lamp]
