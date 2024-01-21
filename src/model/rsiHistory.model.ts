import { PrismaClient } from '@prisma/client'
import Decimal from 'decimal.js'

export default class RsiHisoryService {
  private _prisma: PrismaClient

  constructor() {
    this._prisma = new PrismaClient()
  }

  public async insert(params: { marketId: number; date: Date; rsi: Decimal }) {
    return await this._prisma.rsiHistories.create({
      data: {
        marketId: params.marketId,
        date: params.date,
        rsi: params.rsi.toNumber(),
      },
    })
  }
}
