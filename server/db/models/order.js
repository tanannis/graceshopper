const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open'
  },
  sessionId: {type: Sequelize.STRING},
  userId: {type: Sequelize.INTEGER}
})

module.exports = Order
