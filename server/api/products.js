const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'description', 'price', 'imageUrl', 'quantity']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.id)
    if (!productToUpdate) {
      const err = Error('product does not exist')
      err.status = 409
      throw err
    }
    if (productToUpdate) {
      await productToUpdate.update({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
      })
      res.json(productToUpdate)
    }
  } catch (error) {
    next(error)
  }
})
