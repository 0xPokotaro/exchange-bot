import BybitModel from '../model/bybit.model'
import { InsertMarketHistory } from '../domain/marketHisotry'

interface IBybitService {
  getKline(marketId: number): Promise<InsertMarketHistory>
}

export default class BybitService implements IBybitService {
  private bybitModel: BybitModel

  constructor(bybitModel: BybitModel) {
    this.bybitModel = bybitModel
  }

  public async getKline(marketId: number) {
    const response = await this.bybitModel.getKline({
      category: 'inverse',
      symbol: 'BTCUSDT',
      interval: '1',
      limit: 1,
    })

    const klineLatest = response.list[0]

    return new InsertMarketHistory(
      marketId,
      Number(klineLatest[0]),
      Number(klineLatest[4])
    )
  }
}
