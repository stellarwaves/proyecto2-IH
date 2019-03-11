const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/User');

const { requireAnon, requireUser, requireFields } = require('../middlewares/auth');

const uploadCloud = require('../config/cloudinary')

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  const data = {
    message: req.flash('validation')
  };
  res.render('auth/signup', data);
});

router.post('/signup', requireAnon,   uploadCloud.single('image-back'), async (req, res, next) => {
  const { name, mail, password, header, description, category } = req.body;
  const { url: imageUrl } = req.file
  try {
    const result = await User.findOne({ name });
    if (result) {
      req.flash('validation', 'This name is taken');
      res.redirect('/auth/signup');
      console.log('No hago el signup')
      return;
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      name, mail, password: hashedPassword, header, description, category, imageUrl
    };
    const createUser = await User.create(newUser);
    req.session.currentUser = createUser;
    console.log('no redirijo ni guardo en la bd')
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/login', requireAnon, (req, res, next) => {
  const data = {
    message: req.flash('validation')
  };
  res.render('auth/login', data);
});

router.post('/login', requireAnon, requireFields, async (req, res, next) => {
  const { mail, password } = req.body;
  try {
    const user = await User.findOne({ mail });
    if (!user) {
      req.flash('validation', 'User name or password are incorrect');
      res.redirect('/auth/login');
      console.log('No hace en login')
      return;
    }

    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/categories');
    } else {
      
      req.flash('Validation', 'Username or password are incorrect');
      res.redirect('/auth/login');
      console.log('entro aqui')
    }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', requireUser, async (req, res) => {
  delete req.session.currentUser;

  res.redirect('/');
});

module.exports = router;
