import { useState } from "react"
import { useTicket } from "../../hooks/useTicket"

import { getNumberArray } from "../../utils/helpers"
import { ticketFields } from "../../constants/ticketFields"

import TicketHeader from "./TicketHeader"
import TicketField from "./TicketField"
import TicketGameEnd from "./TicketGameEnd"

import styles from "./Ticket.module.css"

const { firstField, secondField } = ticketFields

const firstFieldNumbers = getNumberArray(
  firstField.firstNumber,
  firstField.lastNumber
)
const secondFieldNumbers = getNumberArray(
  secondField.firstNumber,
  secondField.lastNumber
)

export default function Ticket() {
  const [isError, setIsError] = useState<boolean>(false)

  const {
    gameInfo,
    firstFieldSelected,
    secondFieldSelected,
    isGameEnd,
    isTicketWon,
    selectRandomItems,
    handleResult,
    handleSelectFirstField,
    handleSelectSecondField,
  } = useTicket(firstField, secondField, isError)

  function handleChange() {
    setIsError((prev) => !prev)
  }

  const isBtnDisabled =
    firstFieldSelected.length < firstField.maxSelectedNumbers ||
    secondFieldSelected.length < secondField.maxSelectedNumbers

  return (
    <div className={styles.ticket}>
      <TicketHeader isGameEnd={isGameEnd} onClick={selectRandomItems} />
      {isGameEnd && !gameInfo.isLoading ? (
        <TicketGameEnd isTicketWon={isTicketWon} gameInfo={gameInfo} />
      ) : (
        <>
          <div className={styles.ticket__fields}>
            <TicketField
              field={firstField}
              numbers={firstFieldNumbers}
              selectedNumbers={firstFieldSelected}
              handleSelect={handleSelectFirstField}
            />
            <TicketField
              field={secondField}
              numbers={secondFieldNumbers}
              selectedNumbers={secondFieldSelected}
              handleSelect={handleSelectSecondField}
            />
          </div>
          <button
            className={`${styles.ticket__btn} ${
              isBtnDisabled ? styles.disabled : ""
            }`}
            onClick={handleResult}
            disabled={isBtnDisabled}
          >
            {gameInfo.isLoading ? "Загрузка..." : "Показать результат"}
          </button>
          <div className={styles.error_test}>
            <input type="checkbox" id="checkbox" onChange={handleChange} />
            <label htmlFor="checkbox">Получить ошибку при запросе</label>
          </div>
        </>
      )}
    </div>
  )
}
