const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  type: Sequelize.ENUM('open', 'closed')
})

module.exports = Order
