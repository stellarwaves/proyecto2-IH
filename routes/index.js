const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Match = require('../models/Match')
const { requireUser } = require('../middlewares/auth')
const uploadCloud = require('../config/cloudinary')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { layout: 'layout-fullpage' })
})

// pagina de las categorias
router.get('/categories', requireUser, (req, res, next) => {
  res.render('templates/categories', { title: 'Choose an instrument' })
})

// Lista de los profesores
router.get('/list', requireUser, uploadCloud.single('image-back'), uploadCloud.single('image-perfil'), async (req, res, next) => {
  const instrument = req.query.id

  try {
    const users = await User.find({ 'category': instrument, _id: { $nin: [req.session.currentUser._id] } })
    // res.render('templates/list', { users, title: instrument })
    res.render('templates/list', { users, title: `Learn ${instrument}` })
  } catch (error) {
    next(error)
  }
})

// detalle de los profesores
router.get('/detail/:id', requireUser, uploadCloud.single('image-back'), uploadCloud.single('image-perfil'), async (req, res, next) => {
  const { id } = req.params
  try {
    const profesor = await User.findById(id)
    res.render('templates/detail', { profesor, title: 'The teacher' })
  } catch (error) {
    next(error)
  }
})

router.post('/detail/:id', requireUser, async (req, res, next) => {
  const { id } = req.params
  // console.log(id)
  const { _id } = req.session.currentUser
  // console.log(_id)
  const myTeacher = {
    teacher: id,
    student: _id
  }

  try {
    await Match.create(myTeacher)
    // const buttonOnclick = () => {
    //   swal('Oops!', 'Something went wrong on the page!', 'error')
    // }
    // console.log(match)
    /* res.redirect(`/${id}/match`) */
    res.redirect(`/detail/${id}`)
  } catch (error) {
    next(error)
  }
})

// Matches
router.get('/profile', requireUser, uploadCloud.single('image-perfil'), async (req, res, next) => {
  const _id = req.session.currentUser._id
  // const { id } = req.params

  try {
    const user = await Match.find({ student: { _id } }).populate('teacher')

    const myStudents = await Match.find({ teacher: { _id } }).populate('student')

    res.render('templates/match', { user, myStudents, layout: 'layout-match', title: 'My profile' })
  } catch (error) {
    next(error)
  }
})

// El Profesor a aceptado
router.post('/profile/:id/accept', async (req, res, next) => {
  try {
    const { id } = req.params
    await Match.findOneAndUpdate({ student: id }, { $set: { state: 'Aceptado' } })
    console.log(id)

    res.redirect('/profile')
  } catch (error) {
    next(error)
  }
})

// El profesor a declinado
router.post('/profile/:id/decline', async (req, res, next) => {
  try {
    const { id } = req.params
    await Match.findOneAndDelete({ student: id }, { $set: { state: 'Rechazado ' } })

    res.redirect('/profile')
  } catch (error) {
    next(error)
  }
})

// Editar el perfil de usuario
router.get('/profile/edit', requireUser, uploadCloud.single('image-perfil'), async (req, res, next) => {
  const { _id } = req.session.currentUser

  try {
    const profile = await User.findById(_id)
    res.render('templates/edit', { profile, title: 'Edit profile' })
  } catch (error) {
    next(error)
  }
})

router.post('/profile/edit', requireUser, uploadCloud.single('image-perfil'), async (req, res, next) => {
  const id = req.session.currentUser._id

  // const { url: imageProfile } = req.file
  const { longitude, latitude, name } = req.body
  const userProfile = {
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    name
  }
  if (req.file) {
    userProfile.imageProfile = req.file.url
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, userProfile, { new: true })
    req.session.currentUser = updatedUser

    res.redirect('/profile')
  } catch (error) {
    next(error)
  }
})

router.get('/profile/edit/lesson', requireUser, async (req, res, next) => {
  const { _id } = req.session.currentUser
  try {
    const profile = await User.findById(_id)
    res.render('templates/editLesson', { profile, title: 'Create a lesson' })
  } catch (error) {
    next(error)
  }
})

// Editar las lecciones del usuario
router.post('/profile/edit/lesson', requireUser, uploadCloud.single('image-back'), async (req, res, next) => {
  const id = req.session.currentUser._id
  console.log(req.body)
  // const { url: imageUrl } = req.file

  const { header, description, category } = req.body
  const userProfileLesson = {
    header,
    description,
    category
    // imageUrl
  }
  if (req.file) {
    userProfileLesson.imageUrl = req.file.url
  }
  try {
    await User.findByIdAndUpdate(id, userProfileLesson)
    res.redirect(`/detail/${id}`)
    // res.redirect('/categories')
  } catch (error) {
    next(error)
  }
})

// Borrar el perfil
router.post('/profile/delete', requireUser, async (req, res, next) => {
  const id = req.session.currentUser._id
  try {
    await User.findByIdAndDelete(id)
    delete req.session.currentUser
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

module.exports = router
