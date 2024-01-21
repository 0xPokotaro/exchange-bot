import { PrismaClient } from '@prisma/client'

export default class BatchLogModel {
  private _prisma: PrismaClient

  constructor() {
    this._prisma = new PrismaClient()
  }

  public async insert(params: { name: string }) {
    await this._prisma.batchLogs.create({
      data: {
        batchName: params.name,
        batchDate: new Date(),
      },
    })
  }
}
