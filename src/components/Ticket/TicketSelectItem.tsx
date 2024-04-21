import { PropsTicketSelectItem } from "../../types/ticket/TicketSelectItem"

import styles from "./TicketSelectItem.module.css"

export default function TicketSelectItem({
  number,
  selectedNumbers,
  onClick,
}: Readonly<PropsTicketSelectItem>) {
  const isSelected = selectedNumbers.includes(number)

  function handleClick() {
    onClick(number)
  }

  return (
    <li
      onClick={handleClick}
      className={`${styles.item} ${isSelected ? styles.selected : ""}`}
    >
      {number}
    </li>
  )
}
