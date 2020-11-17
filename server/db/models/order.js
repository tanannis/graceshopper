const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open'
  },
  sessionId: {type: Sequelize.STRING},
  userId: {type: Sequelize.INTEGER},
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  addressLine1: {
    type: Sequelize.STRING
  },
  addressLine2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zipCode: {
    type: Sequelize.STRING
  }
})

module.exports = Order
