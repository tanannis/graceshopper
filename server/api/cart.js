const router = require('express').Router()
const {Product, Order, OrderItem} = require('../db/models')
module.exports = router
const session = require('express-session')

//GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    let cartId
    if (req.user) {
      const [cart] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'open'
        }
      })
      cartId = cart.id
    } else {
      const [cart] = await Order.findOrCreate({
        where: {
          sessionId: req.sessionID,
          status: 'open'
        }
      })
      cartId = cart.id
    }
    const cartItems = await Order.findAll({
      where: {id: cartId},
      include: [Product]
    })
    res.send(cartItems)
  } catch (err) {
    next(err)
  }
})

//Add items to cart and modify current cart
//add to orderItem, must have correct orderId that's related to the cart
// router.post('/', async (req, res, next) =>{
//   try {
//     //req.user to find open order
//   } catch (error) {
//     next(error)
//   }
// })

//steps:
//add items to cart
//match item by item id?
//

//increment quantity of item in cart
router.put('/:id', async (req, res, next) => {
  try {
    let cartId
    if (req.user) {
      const [cart] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'open'
        }
      })
      cartId = cart.id
    } else {
      const [cart] = await Order.findOrCreate({
        where: {
          sessionId: req.sessionID,
          status: 'open'
        }
      })
      cartId = cart.id
    }

    const orderItemToIncrement = await OrderItem.findOne({
      where: {
        productId: req.params.id,
        orderId: cartId
      }
    })

    await orderItemToIncrement.update({
      quantity: orderItemToIncrement.quantity + 1
    })
    res.json(orderItemToIncrement)

    // const orderItemToIncrement = await OrderItem.findOne({where: {
    //   productId: req.params.id,
    // }})
    //   await orderItemToIncrement.update({
    //     quantity: orderItemToIncrement.quantity + 1,
    //   })
    //   res.json(orderItemToIncrement)
  } catch (error) {
    next(error)
  }
})
