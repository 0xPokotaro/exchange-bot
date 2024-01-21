import BatchLogModel from '../model/batchLog.model'

export default class BatchLogService {
  private _batchLogModel: BatchLogModel

  constructor(batchLogModel: BatchLogModel) {
    this._batchLogModel = batchLogModel
  }

  public async insert(params: { name: string }) {
    await this._batchLogModel.insert(params)
  }
}
