import { Decimal } from 'decimal.js'
import RsiHistoryModel from '../model/rsiHistory.model'

export default class RsiHisoryService {
  private rsiHistoryModel: RsiHistoryModel

  constructor(rsiHistoryModel: RsiHistoryModel) {
    this.rsiHistoryModel = rsiHistoryModel
  }

  /**
   * RSIを計算する
   * @param prices Decimal[]
   * @returns Promise<Decimal>
   */
  public async calculate(prices: Decimal[]): Promise<Decimal> {
    let totalGain = new Decimal(0)
    let totalLoss = new Decimal(0)

    for (let i = 1; i < prices.length; i++) {
      let priceChange = prices[i].minus(prices[i - 1])

      if (priceChange.isPositive()) {
        totalGain = totalGain.plus(priceChange)
      } else {
        totalLoss = totalLoss.plus(priceChange.abs())
      }
    }

    const averageGain = totalGain.div(prices.length - 1)
    const averageLoss = totalLoss.div(prices.length - 1)
    const relativeStrength = averageLoss.isZero()
      ? new Decimal(0)
      : averageGain.div(averageLoss)

    const rsi = new Decimal(100)
      .minus(new Decimal(100).div(new Decimal(1).plus(relativeStrength)))
      .toDecimalPlaces(2)

    return rsi
  }

  /**
   * RSIを保存する
   * @param params { marketId: number; date: Date; rsi: Decimal }
   * @returns Promise<void>
   */
  public async insert(params: { marketId: number; date: Date; rsi: Decimal }) {
    return await this.rsiHistoryModel.insert(params)
  }
}
