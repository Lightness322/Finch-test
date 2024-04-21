import { PropsTicketGameEnd } from "../../types/ticket/TicketGameEnd"

export default function TicketGameEnd({
  isTicketWon,
  gameInfo,
}: Readonly<PropsTicketGameEnd>) {
  return (
    <>
      {gameInfo.errorMessage ? (
        <div>{gameInfo.errorMessage}</div>
      ) : (
        <div>
          {isTicketWon
            ? "Ого, вы выиграли! Поздравляем!"
            : "К сожалению, вы проиграли. В следующий раз обязательно повезет!"}
        </div>
      )}
    </>
  )
}
