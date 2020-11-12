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
    } catch (error) {
    next(error)
  }
})

   
router.post('/', async (req, res, next) => {
  try {
    console.log('BODY', req.body)
    const newItem = await OrderItem.create({
      quantity: req.body.quantity,
      orderId: req.body.orderId,
      productId: req.body.productId
    })
    console.log(newItem)
    res.json(newItem)

  } catch (error) {
    next(error)
  }
})
