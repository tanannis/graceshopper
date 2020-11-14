const db = require('../server/db')
const {User, Order, OrderItem, Product} = require('../server/db/models')

const usersArray = [
  {
    firstName: 'Jack',
    lastName: 'Bens',
    email: 'jb@email.com',
    password: 'ilovecake123',
    userType: 'admin'
  },
  {
    firstName: 'Miki',
    lastName: 'Lee',
    email: 'ml@email.com',
    password: 'ilovecake123'
  },
  {
    firstName: 'Jacobs',
    lastName: 'Mock',
    email: 'jm@email.com',
    password: 'ilovecake123'
  },
  {
    firstName: 'Ken',
    lastName: 'Paige',
    email: 'kb@email.com',
    password: 'ilovecake123'
  },
  {
    firstName: 'Lynn',
    lastName: 'Young',
    email: 'ly@email.com',
    password: 'ilovecake123'
  }
]

const productsArray = [
  {
    name: 'Fruit Napoleon',
    imageUrl:
      'https://i.ibb.co/ygz1yX6/The-Best-Napoleon-Cake-is-made-with-thin-puff-pastry-layers-then-sandwiched-with-rich-and-buttery-cu.jpg',
    description:
      'Our signature handmade napoleon made of very thin and flaky puff pastry cake layers and a smooth, rich and luscious pastry cream in between the layers, topped with fresh fruit.',
    price: 8,
    quantity: 10
  },
  {
    name: 'Chocolate Dream Donuts',
    imageUrl:
      'https://i.ibb.co/yQ3XTrZ/gluten-free-vegan-baked-chocolate-donuts.jpg',
    description:
      'Our famous chocolate donuts covered with silky melted chocolate glaze, paradise in every bite...',
    price: 3,
    quantity: 10
  },
  {
    name: 'Pear Puff',
    imageUrl: 'https://i.ibb.co/Bc13Pnz/poached-pear-puff-pastry-1.jpg',
    description:
      'Limited edition: pear puff made of very thin and flaky puff pastry cake layers and a smooth, rich and luscious pear pastry cream in between the layers.',
    price: 6,
    quantity: 10
  },
  {
    name: 'French Croissant',
    imageUrl: 'https://i.ibb.co/5KvXzfn/Italian-croissants-15-500x500.jpg',
    description:
      'Our best seller: this handmade cloud-like puff pastry is buttery and flaky. It really is one of the most decadent things you can eat.',
    price: 3,
    quantity: 10
  },
  {
    name: 'Cream Puff',
    imageUrl:
      'https://i.ibb.co/RgZSP1W/cream-puff-recipe-chocolate-glaze-1-S-12750.jpg',
    description:
      'Try our new fluffy cream puff today! It is made of very thin and flaky puff pastry layers filled with rich vanilla cream inside.',
    price: 6,
    quantity: 10
  },
  {
    name: 'Fruit Tart',
    imageUrl: 'https://i.ibb.co/gVRWrbY/Fruit-tart-2019-feature.jpg',
    description:
      'This fruit tart has a sweet pastry crust, smooth cream filling and topped with organic fresh fruit. It is a healthy and elegant dessert for tea time!',
    price: 6,
    quantity: 10
  },
  {
    name: 'New York Cheese Cake',
    imageUrl: 'https://i.ibb.co/5sWXFvq/Classic-Cheesecake-Recipe-1.jpg',
    description:
      'Creamy and delicious with a touch of lime juice, the New York Cheese Cake is one of our best sellers!',
    price: 7,
    quantity: 10
  },
  {
    name: 'Strawberry Cheese Cake',
    imageUrl: 'https://i.ibb.co/JW1r37d/mini-cheesecakes-21.jpg',
    description:
      'Topped with fresh organic strawberry, this creamy cheese cake is our new signature for an elegant experience.',
    price: 6,
    quantity: 10
  },
  {
    name: 'Curry Triangle Puff',
    imageUrl: 'https://i.ibb.co/vcf2NJs/Puff-Pastry-Pockets1.jpg',
    description:
      'A classic Asian pastry with curry filling inside, its crust is made of very thin and flaky puff pastry cake layers that will give you an unique experience. ',
    price: 6,
    quantity: 10
  },
  {
    name: 'Mini Spinach Quiche',
    imageUrl: 'https://i.ibb.co/vQbh93b/spinach-cheese-puffs-4.jpg',
    description:
      'Our new favorite: made with heavy cream and organic spinach, this quiche is a classic French pastry.',
    price: 5,
    quantity: 10
  },
  {
    name: 'Egg Tart',
    imageUrl: 'https://i.ibb.co/fkXB6FV/Hokkaido-Cheese-Tart-2.jpg',
    description:
      'Our new favorite: made with organic eggs, its crust is made of flaky puff pastry cake layers, this tart is a classic Asian pastry.',
    price: 5,
    quantity: 10
  },
  {
    name: 'Chocolate Chip Scone',
    imageUrl: 'https://i.ibb.co/PGVJkcq/Easy-Chocolate-Chip-Scones.jpg',
    description:
      'Our signature scone: it has a “short” crumbly texture that is a must for afternoon tea!',
    price: 5,
    quantity: 10
  }
]

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
