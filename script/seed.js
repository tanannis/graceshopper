'use strict'

const faker = require('faker')
const db = require('../server/db')
const {User, Cart, CartItem, Product} = require('../server/db/models')

const usersArray = []
const productsArray = []
const cartsArray = [{userId: 1}, {userId: 2}, {userId: 3}, {userId: 4}]
const cartItemsArray = [
  {cartId: 1, productId: 1},
  {cartId: 2, productId: 2},
  {cartId: 3, productId: 3},
  {cartId: 4, productId: 4}
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  for (let i = 0; i < 10; i++) {
    usersArray.push({
      firstName: `${faker.name.firstName()}`,
      lastName: `${faker.name.lastName()}`,
      email: `${faker.internet.email()}`,
      password: `${faker.internet.password()}`
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
  const carts = await Promise.all(
    cartsArray.map(cart => {
      return Cart.create(cart)
    })
  )
  const cartItems = await Promise.all(
    cartItemsArray.map(cartItem => {
      return CartItem.create(cartItem)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${carts.length} carts`)
  console.log(`seeded ${cartItems.length} cart items`)
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
