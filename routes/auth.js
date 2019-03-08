const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/User');

const { requireAnon, requireUser, requireFields } 

const saltRounds = 10;

router.get('/signup', (req, res, next) => {
  const data = {
    message: req.flash('validation')
  };
  res.render('auth/signup', data);
})
;

router.post('/signup', requireAnon, requireFields, async (req, res, next) => {
  const { name, mail, password, description, category } = req.body;
  try {
    const result = await User.findOne({ name });
    if (result) {
      req.flash('validation', 'This name is taken');
      res.redirect('/auth/signup');
      return;
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      name, mail, password: hashedPassword, description, category
    };
    const createUser = await User.create(newUser);
    req.session.currentUser = createUser;
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});
