import { Dispatch, SetStateAction, useState } from "react"

import { getUniqueRandomNumberArray } from "../utils/helpers"

import { ITicketField } from "../types/ticket/TicketField"

export function useSelectTickets(
  firstField: ITicketField,
  secondField: ITicketField
) {
  const [firstFieldSelected, setFirstFieldSelected] = useState<number[]>([])
  const [secondFieldSelected, setSecondFieldSelected] = useState<number[]>([])

  function isSelected(number: number, selectedNumbers: number[]) {
    return selectedNumbers.includes(number)
  }

  function selectRandomItems() {
    setFirstFieldSelected(
      getUniqueRandomNumberArray(
        firstField.firstNumber,
        firstField.lastNumber,
        firstField.maxSelectedNumbers
      )
    )
    setSecondFieldSelected(
      getUniqueRandomNumberArray(
        secondField.firstNumber,
        secondField.lastNumber,
        secondField.maxSelectedNumbers
      )
    )
  }

  function handleSelect(
    selectedArr: number[],
    setSelectedArr: Dispatch<SetStateAction<number[]>>,
    maxSelected: number
  ) {
    return (number: number) => {
      if (isSelected(number, selectedArr)) {
        setSelectedArr((prev) =>
          [...prev].filter((selectedNum) => selectedNum !== number)
        )
      } else {
        if (selectedArr.length === maxSelected) {
          setSelectedArr((prev) => [...prev.slice(1), number])
        } else {
          setSelectedArr((prev) => [...prev, number])
        }
      }
    }
  }
  const handleSelectFirstField = handleSelect(
    firstFieldSelected,
    setFirstFieldSelected,
    firstField.maxSelectedNumbers
  )

  const handleSelectSecondField = handleSelect(
    secondFieldSelected,
    setSecondFieldSelected,
    secondField.maxSelectedNumbers
  )

  return {
    firstFieldSelected,
    secondFieldSelected,
    handleSelectFirstField,
    handleSelectSecondField,
    selectRandomItems,
  }
}
