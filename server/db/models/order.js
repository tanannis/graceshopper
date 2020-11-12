const db = require('../db')
const Sequelize = require('sequelize')

// what is the intent behind storing a sessionId?
const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open'
  },
  sessionId: {type: Sequelize.STRING},
  userId: {type: Sequelize.INTEGER}
})

module.exports = Order
