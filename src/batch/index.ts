import schedule from 'node-schedule'
import main from '../bot/index'

schedule.scheduleJob('*/1 * * * *', async () => {
  console.log('start: ', new Date())
  await main()
})
