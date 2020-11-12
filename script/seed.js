'use strict'

const faker = require('faker')
const db = require('../server/db')
const {User, Order, OrderItem, Product} = require('../server/db/models')

const usersArray = []
const productsArray = []
const ordersArray = [
  {userId: 1},
  {userId: 2},
  {userId: 3},
  {sessionId: 'akdjflke234'}
]
const orderItemsArray = [
  {orderId: 1, productId: 1},
  {orderId: 2, productId: 2},
  {orderId: 3, productId: 3},
  {orderId: 4, productId: 4},
  {orderId: 4, productId: 3}
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  for (let i = 0; i < 10; i++) {
    usersArray.push({
      firstName: `${faker.name.firstName()}`,
      lastName: `${faker.name.lastName()}`,
      email: `${faker.internet.email()}`,
      password: 'hello'
    })

    productsArray.push({
      name: `${faker.commerce.productName()}`,
      price: `${faker.commerce.price()}`,
      description: `${faker.commerce.productDescription()}`
    })
  }

  const users = await Promise.all(
    usersArray.map(user => {
      return User.create(user)
    })
  )
  const products = await Promise.all(
    productsArray.map(product => {
      return Product.create(product)
    })
  )
  const orders = await Promise.all(
    ordersArray.map(order => {
      return Order.create(order)
    })
  )
  const orderItems = await Promise.all(
    orderItemsArray.map(orderItem => {
      return OrderItem.create(orderItem)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderItems.length} order items`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
