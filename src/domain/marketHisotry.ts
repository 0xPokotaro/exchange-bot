import { z } from 'zod'

const MarketHistorySchema = z.object({
  id: z.string(),
  marketId: z.number(),
  closePrice: z.number(),
  startTime: z.number(),
})

export class MarketHistory {
  readonly id: string
  readonly marketId: number
  readonly closePrice: number
  readonly startTime: number

  constructor(
    id: string,
    marketId: number,
    startTime: number,
    closePrice: number
  ) {
    MarketHistorySchema.parse({
      id,
      marketId,
      startTime,
      closePrice,
    })

    this.id = id
    this.marketId = marketId
    this.startTime = startTime
    this.closePrice = closePrice
  }
}

export class InsertMarketHistory {
  readonly marketId: number
  readonly startTime: number
  readonly closePrice: number

  constructor(marketId: number, startTime: number, closePrice: number) {
    this.marketId = marketId
    this.startTime = startTime
    this.closePrice = closePrice
  }
}
