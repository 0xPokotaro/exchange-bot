import type { GetKlineParamsV5 } from 'bybit-api'
import { RestClientV5 } from 'bybit-api'

const API_KEY = ''
const API_SECRET = ''
const useTestnet = false

interface IBybitModel {
  getKline(params: GetKlineParamsV5): void
}

class BybitModel implements IBybitModel {
  private readonly _restClientV5: RestClientV5

  constructor() {
    this._restClientV5 = new RestClientV5({
      key: API_KEY,
      secret: API_SECRET,
      testnet: useTestnet,
    })
  }

  public async getKline(params: GetKlineParamsV5) {
    const response = await this._restClientV5.getKline(params)

    if (response === undefined) {
      throw new Error('Response is undefined')
    } else if (response.retCode !== 0) {
      throw new Error(response.retMsg)
    }

    return response.result
  }
}

export default BybitModel
