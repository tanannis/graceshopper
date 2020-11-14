const router = require('express').Router()
const {Product, Order, OrderItem} = require('../db/models')
module.exports = router

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
    res.send(cartItems[0])
  } catch (err) {
    next(err)
  }
})

//checkout close order
router.put('/checkout', async (req, res, next) => {
  try {
    let cartId
    if (req.user) {
      const cart = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'open'
        }
      })
      cartId = cart.id
    } else {
      const cart = await Order.findOne({
        where: {
          sessionId: req.sessionID,
          status: 'open'
        }
      })
      cartId = cart.id
    }
    const orderToUpdate = await Order.findOne({
      where: {
        id: cartId
      }
    })
    await orderToUpdate.update({
      status: 'closed',
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.addressLineOne,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode
    })
    res.json(orderToUpdate)
  } catch (error) {
    next(error)
  }
})

// increment quantity of item in cart
router.put('/item/:id', async (req, res, next) => {
  try {
    let updatedOrderItem = req.body
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
      quantity: updatedOrderItem.quantity
    })
    res.json(orderItemToIncrement)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newItem = await OrderItem.create({
      quantity: req.body.quantity,
      orderId: req.body.orderId,
      productId: req.body.productId
    })
    res.json(newItem)
  } catch (error) {
    next(error)
  }
})

router.delete('/item/:id', async (req, res, next) => {
  try {
    let cartId
    if (req.user) {
      const cart = await Order.findOne({
        where: {
          userId: req.user.id,
          status: 'open'
        }
      })
      cartId = cart.id
    } else {
      const cart = await Order.findOne({
        where: {
          sessionId: req.sessionID,
          status: 'open'
        }
      })
      cartId = cart.id
    }
    const orderItemToDelete = await OrderItem.findOne({
      where: {
        productId: req.params.id,
        orderId: cartId
      }
    })
    await orderItemToDelete.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
