const db = require('../db')
const Sequelize = require('sequelize')

// I like the comment around making the price an Integer!
// should quantity have a minimum value as well?
const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    //type: Sequelize.INTEGER divide by 100 on the front end
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/Chocolate_Chip_Cookies_-_kimberlykv.jpg'
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
})

module.exports = Product
