const db = require('../db')
const Sequelize = require('sequelize')

const CartItem = db.define('cartItem', {
  quantity: Sequelize.INTEGER
  // defaultValue: 0
})

module.exports = CartItem
