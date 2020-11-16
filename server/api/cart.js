const router = require('express').Router()
const {Product, Order, OrderItem} = require('../db/models')
const nodeMailer = require('nodemailer')
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

// checkout close order
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
      name: req.body.card.name,
      email: req.body.email,
      addressLine1: req.body.card.address_line1,
      addressLine2: req.body.card.address_line2,
      city: req.body.card.address_city,
      state: req.body.card.address_state,
      zipCode: req.body.card.address_zip
    })
    res.json(orderToUpdate)
  } catch (error) {
    next(error)
  }
})

router.post('/checkout', function(req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD
    }
  })
  let mailOptions = {
    to: req.user.email,
    subject: req.body.subject,
    text: req.body.message
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
  res.end()
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

//GET /api/cart/history/:userId
router.get('/history/:userId', async (req, res, next) => {
  try {
    //if you're not logged in --> 401
    //and if you're not an admin --> you can only look at your own order history
    if (
      !req.user ||
      (req.user.userType !== 'admin' && req.params.userId != req.user.id)
    )
      return res.sendStatus(401)
    const orders = await req.user.getOrders({
      include: Product,
      where: {status: 'closed'}
    })
    res.send(orders)
  } catch (error) {
    next(error)
  }
})
