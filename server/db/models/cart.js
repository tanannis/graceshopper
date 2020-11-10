const db = require('../db')
const Sequelize = require('sequelize')

const Cart = db.define('cart', {})

module.exports = Cart
