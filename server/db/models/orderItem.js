const db = require('../db')
const Sequelize = require('sequelize')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderItem
