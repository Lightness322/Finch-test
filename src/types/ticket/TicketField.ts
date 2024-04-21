export interface PropsTicketField {
  field: ITicketField
  numbers: number[]
  selectedNumbers: number[]
  handleSelect: (num: number) => void
}

export interface ITicketField {
  number: number
  firstNumber: number
  lastNumber: number
  maxSelectedNumbers: number
  relatedMatchQuantity: number
  selfMatchQuantity?: number
}
