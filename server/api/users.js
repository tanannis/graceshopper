const router = require('express').Router()
const {User} = require('../db/models')
const permit = require('./authorization')
module.exports = router

// same as permit? Safe to remove?
function isAdmin(req, res, next) {
  if (req.user && req.user.userType !== 'admin') {
    res.status(403).json({message: 'Forbidden'})
  } else {
    next()
  }
}

// does permit take any inputs?
router.get('/', permit(['admin']), async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['firstName', 'lastName', 'id', 'email', 'userType']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/changeUserType/:id', permit(['admin']), async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id)
    if (!userToUpdate) {
      const err = Error('user does not exist')
      err.status = 409
      throw err
    }
    if (userToUpdate && userToUpdate.userType === 'user') {
      await userToUpdate.update({
        userType: 'admin'
      })
    } else if (userToUpdate && userToUpdate.userType === 'admin') {
      await userToUpdate.update({
        userType: 'user'
      })
    }
    res.json(userToUpdate)
  } catch (error) {
    next(error)
  }
})
