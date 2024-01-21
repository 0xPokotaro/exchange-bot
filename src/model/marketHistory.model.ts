import { PrismaClient } from '@prisma/client'
import { InsertMarketHistory } from '../domain/marketHisotry'

class MarketHistoryModel {
  private _prisma: PrismaClient

  constructor() {
    this._prisma = new PrismaClient()
  }

  public async list(params: { marketId: number; limit: number }) {
    return await this._prisma.marketHistories.findMany({
      where: {
        marketId: params.marketId,
      },
      orderBy: {
        startTime: 'desc',
      },
      take: params.limit,
    })
  }

  public async insert(params: InsertMarketHistory) {
    await this._prisma.marketHistories.create({
      data: {
        marketId: params.marketId,
        startTime: params.startTime,
        closePrice: params.closePrice,
      },
    })
  }
}

export default MarketHistoryModel
