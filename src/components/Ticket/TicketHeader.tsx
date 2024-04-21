import { PropsTicketHeader } from "../../types/ticket/TicketHeader"

import styles from "./TicketHeader.module.css"

export default function TicketHeader({
  isGameEnd,
  onClick,
}: PropsTicketHeader) {
  return (
    <div className={styles.title__row}>
      <h2 className={styles.title}>Билет 1</h2>
      {!isGameEnd && (
        <button className={styles.title__random} onClick={onClick}>
          <img src="magic-wand.svg" alt="magic wand icon" />
        </button>
      )}
    </div>
  )
}
