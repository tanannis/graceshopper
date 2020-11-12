const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// We already have some routes laid out that are great usecases for protecting our data
// I can see that the PUT route has great logic in there - can we use this other places? (both inside this file and in other files!)

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

// /post /api/products
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

//delete /api/products/:productid
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Product.destroy({where: {id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (!req.user || req.user.userType !== 'admin') {
      res.sendStatus(401)
      return
    }
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
