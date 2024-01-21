import BatchLogModel from '../model/batchLog.model'
import BatchLogService from '../service/batchLog.service'
import BybitModel from '../model/bybit.model'
import BybitService from '../service/bybit.service'
import MarketHistoryModel from '../model/marketHistory.model'
import MarketHistoryService from '../service/marketHistory.service'
import RsiHistoryModel from '../model/rsiHistory.model'
import RisHistoryService from '../service/rsiHistory.service'
import { BTCUSDT_MARKET_ID } from '../config/constants'

export default async function main() {
  try {
    const batchLogService = new BatchLogService(new BatchLogModel())
    const bybitService = new BybitService(new BybitModel())
    const marketHistoryService = new MarketHistoryService(
      new MarketHistoryModel()
    )
    const rsiHistoryService = new RisHistoryService(new RsiHistoryModel())

    // データを取得する
    const kline = await bybitService.getKline(BTCUSDT_MARKET_ID)

    // DBに保存
    await marketHistoryService.save(kline)

    // RSIを計算する
    const marketHist = await marketHistoryService.list()
    const prices = marketHist.map((v) => v.closePrice)
    const rsi = await rsiHistoryService.calculate(prices)
    console.log(rsi.toString())

    const hoge = await rsiHistoryService.insert({
      marketId: BTCUSDT_MARKET_ID,
      date: new Date(),
      rsi: rsi,
    })

    console.log(hoge)

    // 売買判断をする

    // 売買を実行する

    // DBに保存する

    // ログを出力する
    await batchLogService.insert({ name: 'batch' })

    // 通知を送る
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    } else {
      console.error('Unknown error: ', e)
    }
  }
}
