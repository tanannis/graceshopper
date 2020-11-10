const db = require('../db')
const Sequelize = require('sequelize')

const OrderItem = db.define('orderItem', {
  quantity: Sequelize.INTEGER
  // defaultValue: 0
})

module.exports = OrderItem
