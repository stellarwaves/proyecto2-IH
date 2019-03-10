const express = require('express')
const router = express.Router()

const User = require('../models/User')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Sing your talent' })
})

router.get('/categories', (req, res, next) => {
  res.render('templates/categories')
})

router.get('/list', async (req, res, next) => {
  const instrument = req.query.id

  try {
    const users = await User.find({ 'category': instrument })
    res.render('templates/list', { users, title: instrument })
  } catch (error) {
    next(error)
  }
})

router.get('/detail/:id', async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  try {
    const profesor = await User.findById(id)
    res.render('templates/detail', { profesor })
  } catch (error) {
    next(error)
  }
})

module.exports = router
