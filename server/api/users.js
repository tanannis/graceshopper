const router = require('express').Router()
const {User} = require('../db/models')
const permit = require('./authorization')
module.exports = router

function isAdmin(req, res, next) {
  if (req.user && req.user.userType !== 'admin') {
    res.status(403).json({message: 'Forbidden'})
  } else {
    next()
  }
}

// function isUser(req, res, mext) {
//   if (req.params.id === req.user.id || req.user.userType)
//   return next ()

// }

// router.get('/', isAdmin, async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['firstName', 'lastName', 'id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/', permit(['admin']), async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['firstName', 'lastName', 'id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
