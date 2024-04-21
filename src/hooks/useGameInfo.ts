import { useState } from "react"

import { fetchWithRetry } from "../utils/helpers"
import { postGameResult } from "../services/ticketService"

import { IGameResult } from "../types/ticket/GameResult"

export function useGameInfo(isError: boolean) {
  const [gameData, setGameData] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, serErrorMessage] = useState<string | null>(null)

  async function handleGameInfo(gameResult: IGameResult) {
    try {
      setIsLoading(true)

      if (!isError) {
        return "Success!"
      }

      const data = await fetchWithRetry(
        () => postGameResult(gameResult),
        2,
        2000
      )

      setGameData(data)
    } catch (error) {
      let errorMessage = "An error occurred while sending game results"

      if (error instanceof Error) {
        errorMessage = error.message
      }

      serErrorMessage(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const gameInfo = {
    gameData,
    isLoading,
    errorMessage,
  }

  return { gameInfo, handleGameInfo }
}
