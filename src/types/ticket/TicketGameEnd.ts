export interface PropsTicketGameEnd {
  isTicketWon: boolean
  gameInfo: {
    gameData: string
    isLoading: boolean
    errorMessage: string | null
  }
}
