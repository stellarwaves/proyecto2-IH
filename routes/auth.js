const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/User')

const { requireAnon, requireUser, requireFields } = require('../middlewares/auth')

const uploadCloud = require('../config/cloudinary')

const saltRounds = 10

router.get('/signup', (req, res, next) => {
  const data = {
    message: req.flash('validation')
  }
  res.render('auth/signup', { layout: 'layout-fullpage', data })
})

router.post('/signup', requireAnon, uploadCloud.single('image-perfil'), async (req, res, next) => {
  const { name, mail, password, category } = req.body
  // const { url: imageProfile } = req.file
  let imageProfile;
  let longitude = 41.154878
  let latitude = 2.14246
  if(req.file){
   imageProfile = '/images/perfilDefecto.png'; 
  }
  try {
    const result = await User.findOne({ name })
    if (result) {
      req.flash('validation', 'This name is taken')
      res.redirect('/auth/signup')
      return
    }
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = {
      name,
      mail,
      password: hashedPassword,
      category,
      imageProfile,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    }
    const createUser = await User.create(newUser)
    req.session.currentUser = createUser
    res.redirect('/categories')
  } catch (error) {
    next(error)
  }
})

router.get('/login', requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('validation')
  }
  console.log(data)
  res.render('auth/login',  data )
})

router.post('/login', requireAnon, requireFields, async (req, res, next) => {
  const { mail, password } = req.body
 
  if (!mail|| !password) {
    res.redirect('/auth/login')
  return
  }
  try {
    const user = await User.findOne({ mail })
    if (!user) {
      req.flash('validation', 'User name or password are incorrect')
      res.redirect('/auth/login')
      
      return
    }

    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user
      res.redirect('/categories')
    } else {
      req.flash('validation', 'Username or password are incorrect')
      res.redirect('/auth/login')
      console.log('Fallo password')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/logout', requireUser, async (req, res) => {
  delete req.session.currentUser

  res.redirect('/')
})

module.exports = router
