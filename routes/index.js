const express = require('express')
const router = express.Router()

const User = require('../models/User')
const { requireUser } = require('../middlewares/auth')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Sing your talent' })
})

router.get('/categories', requireUser, (req, res, next) => {
  res.render('templates/categories')
})

router.get('/list', requireUser, async (req, res, next) => {
  const instrument = req.query.id

  try {
    const users = await User.find({ 'category': instrument })
    res.render('templates/list', { users, title: instrument })
  } catch (error) {
    next(error)
  }
})

router.get('/detail/:id', requireUser, async (req, res, next) => {
  const { id } = req.params
  console.log(id)
  try {
    const profesor = await User.findById(id)
    res.render('templates/detail', { profesor })
  } catch (error) {
    next(error)
  }
})

router.get('/profile/edit', requireUser, async (req, res, next) => {
  const { _id } = req.session.currentUser
  try {
    const profile = await User.findById(_id)
    res.render('templates/edit', profile)
  } catch (error) {
    next(error)
  }
})

router.post('/profile/edit', requireUser, async (req, res, next) => {
  const id = req.session.currentUser._id
  const { name, description, category } = req.body
  const userProfile = { name, description, category }
  console.log(id)

  try {
    await User.findByIdAndUpdate(id, userProfile)
    res.redirect('/categories')
  } catch (error) {
    next(error)
  }
})

router.post('/profile/delete', requireUser, async (req, res, next) => {
  const id = req.session.currentUser._id
  try {
    await User.findByIdAndDelete(id)
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

module.exports = router
