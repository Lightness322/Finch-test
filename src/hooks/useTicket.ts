import { useState } from "react"
import { useSelectTickets } from "./useSelectTickets"
import { useGameInfo } from "./useGameInfo"

import { getUniqueRandomNumberArray, isArrayMatch } from "../utils/helpers"

import { ITicketField } from "../types/ticket/TicketField"

export function useTicket(
  firstField: ITicketField,
  secondField: ITicketField,
  isError: boolean
) {
  const [isGameEnd, setIsGameEnd] = useState<boolean>(false)
  const [isTicketWon, setIsTicketWon] = useState<boolean>(false)

  const {
    firstFieldSelected,
    secondFieldSelected,
    handleSelectFirstField,
    handleSelectSecondField,
    selectRandomItems,
  } = useSelectTickets(firstField, secondField)

  const { gameInfo, handleGameInfo } = useGameInfo(isError)

  function handleResult() {
    const firstRandomArr = getUniqueRandomNumberArray(
      firstField.firstNumber,
      firstField.lastNumber,
      firstField.maxSelectedNumbers
    )
    const secondRandomArr = getUniqueRandomNumberArray(
      secondField.firstNumber,
      secondField.lastNumber,
      secondField.maxSelectedNumbers
    )

    const isTicketWon =
      isArrayMatch(
        firstField.selfMatchQuantity!,
        firstFieldSelected,
        firstRandomArr
      ) ||
      (isArrayMatch(
        firstField.relatedMatchQuantity,
        firstFieldSelected,
        firstRandomArr
      ) &&
        isArrayMatch(
          secondField.relatedMatchQuantity,
          secondFieldSelected,
          secondRandomArr
        ))

    setIsTicketWon(isTicketWon)
    setIsGameEnd(true)

    handleGameInfo({
      selectedNumber: {
        firstField: firstFieldSelected,
        secondField: secondFieldSelected,
      },
      isTicketWon,
    })
  }

  return {
    gameInfo,
    firstFieldSelected,
    secondFieldSelected,
    isGameEnd,
    isTicketWon,
    selectRandomItems,
    handleResult,
    handleSelectFirstField,
    handleSelectSecondField,
  }
}
