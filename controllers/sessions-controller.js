const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/user-schema.js')

sessions.get('/new', (req, res) => {
  res.render('login.ejs', { currentUser: req.session.currentUser })
})


sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      res.send('<a href="/" style="text-align: center;">Sorry, that username cannot be found! Click here to go back to the login page.</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/home')
      } else {
        res.send('<a href="/" style="text-align: center;">Incorrect password entered! Click here to go back ot the login page.</a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions