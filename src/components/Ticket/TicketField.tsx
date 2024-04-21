import { PropsTicketField } from "../../types/ticket/TicketField"

import TicketSelectItem from "./TicketSelectItem"

import styles from "./TicketField.module.css"

export default function TicketField({
  field,
  numbers,
  selectedNumbers,
  handleSelect,
}: Readonly<PropsTicketField>) {
  return (
    <div className={styles.filed__container}>
      <div className={styles.field__row}>
        <h3 className={styles.field__title}>Поле {field.number}</h3>
        <span>Отметьте {field.maxSelectedNumbers} чисел.</span>
      </div>
      <ul className={styles.field__list}>
        {numbers.map((number) => (
          <TicketSelectItem
            key={number}
            number={number}
            onClick={handleSelect}
            selectedNumbers={selectedNumbers}
          />
        ))}
      </ul>
    </div>
  )
}
