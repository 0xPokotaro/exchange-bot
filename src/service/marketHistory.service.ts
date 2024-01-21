import { InsertMarketHistory } from '../domain/marketHisotry'
import MarketHistoryModel from '../model/marketHistory.model'

const BTCUSDT_MARKET_ID = 1

interface IMaketHistory {
  save(req: InsertMarketHistory): Promise<void>
}

export default class MarketHistoryService implements IMaketHistory {
  private marketHistoryModel: MarketHistoryModel

  constructor(marketHistoryModel: MarketHistoryModel) {
    this.marketHistoryModel = marketHistoryModel
  }

  public async list() {
    return await this.marketHistoryModel.list({
      marketId: BTCUSDT_MARKET_ID,
      limit: 14,
    })
  }

  public async save(req: InsertMarketHistory) {
    await this.marketHistoryModel.insert(req)
  }
}
