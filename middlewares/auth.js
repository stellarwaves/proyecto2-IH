'use strict'

module.exports = {
  requireAnon (req, res, next) {
    if (req.session.currentUser) {
      res.redirect('/')
      return;
    }
    next()
  },
  requireUser (req, res, next) {
    if (!req.session.currentUser) {
      res.redirect('/')
      return;
    }
    next()
  },
  requireFields (req, res, next) {
    const { mail, password } = req.body
    if (!mail || !password) {
      req.flash('validation', 'Mail or password is missing')
      res.redirect(`/auth${req.path}`)
      return;
    }
    next()
  }
}
