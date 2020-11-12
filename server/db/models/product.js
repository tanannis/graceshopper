const db = require('../db')
const Sequelize = require('sequelize')

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
    //README
    // type: Sequelize.FLOAT,
    //use .INTEGER and divide by 100 on the front end (in the render JSX of a component)to avoid scaling errors
    //or
    //type: Sequelize.DECIMAL,
    // allowNull: false,
    // get() {
    //   return Number(parseFloat(this.getDataValue('price')).toFixed(2))
    // }
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/Chocolate_Chip_Cookies_-_kimberlykv.jpg'
  },
  //README - should this be inventory? and for our cart --> quantity?
  quantity: {
    type: Sequelize.INTEGER
    // defaultValue: 0
    // allowNull: false
  }
})

module.exports = Product
