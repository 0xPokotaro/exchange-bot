import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  let id = 1

  const markets = [
    {
      name: 'BTCUSDT',
    },
  ]

  for (const market of markets) {
    await prisma.markets.upsert({
      where: { id: id++ },
      update: {
        name: market.name,
      },
      create: market,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
