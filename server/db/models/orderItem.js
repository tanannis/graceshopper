const db = require('../db')
const Sequelize = require('sequelize')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  priceDisplay: {
    type: Sequelize.STRING,
    get() {
      return `$${(this.price / 100).toFixed(2)}`
    }
  }
})

module.exports = OrderItem
