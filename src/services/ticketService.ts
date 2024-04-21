import { IGameResult } from "../types/ticket/GameResult"

export async function postGameResult(gameResult: IGameResult) {
  const response = await fetch("https://catfact.ninja/fact", {
    method: "POST",
    body: JSON.stringify(gameResult),
  })

  if (!response.ok) {
    throw new Error("Произошла ошибка при отправке данных на сервер")
  }

  const data = await response.json()

  return data
}
