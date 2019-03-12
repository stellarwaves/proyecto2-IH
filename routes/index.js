const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Match = require('../models/Match')
const { requireUser } = require('../middlewares/auth')

const uploadCloud = require('../config/cloudinary')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/categories', requireUser, (req, res, next) => {
  res.render('templates/categories')
})

router.get('/list', requireUser, uploadCloud.single('image-back'), uploadCloud.single('image-perfil'), async (req, res, next) => {
  const instrument = req.query.id
  try {
    // if (req.session.currentUser) {
    //   let category = req.session.currentUser.category;
    //   const products = await User.find({ instrument: { $ne: category } });
    //   res.render('templates/list', { products });
    // }
    const users = await User.find({ 'category': instrument })
    res.render('templates/list', { users, title: instrument })
  } catch (error) {
    next(error)
  }
})

router.get('/detail/:id', requireUser, uploadCloud.single('image-back'), uploadCloud.single('image-perfil'), async (req, res, next) => {
  const { id } = req.params
  try {
    const profesor = await User.findById(id)
    res.render('templates/detail', { profesor })
  } catch (error) {
    next(error)
  }
})

router.get('/:id/match', requireUser, uploadCloud.single('image-perfil'), async (req, res, next) => {
  const _id = req.session.currentUser._id
  const { id } = req.params
  try {
    const user = await Match.find({ student: { _id } })
    const teacher = await User.findById(id)
    res.render('templates/match', { user, teacher })
  } catch (error) {
    next(error)
  }
})
router.post('/detail/:id/match', requireUser, async (req, res, next) => {
  const { id } = req.params
console.log(id)
  const {_id} = req.session.currentUser
console.log(_id)  
  const myTeacher = {
    teacher: id,
    student: _id
  }

  try {
    const match = await Match.create(myTeacher)
    console.log(match)
    res.redirect(`/${id}/match`)
  } catch (error) {
    next(error)
  }
})

router.get('/profile/edit', requireUser, uploadCloud.single('image-back'), uploadCloud.single('image-perfil'), async (req, res, next) => {
  const { _id } = req.session.currentUser
  try {
    const profile = await User.findById(_id)
    res.render('templates/edit', profile)
  } catch (error) {
    next(error)
  }
})

router.post('/profile/edit', requireUser, /* uploadCloud.single('image-back'), */ uploadCloud.single('image-perfil'), async (req, res, next) => {
  const id = req.session.currentUser._id
  // const { url: imageUrl } = req.file
  const { url: imageProfile } = req.file
  const { name, description, category } = req.body
  const userProfile = { name, description, category, /* imageUrl, */ imageProfile }
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
