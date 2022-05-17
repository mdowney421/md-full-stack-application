//___________________
//Dependencies
//___________________
const express = require('express')
const { redirect } = require('express/lib/response')
const methodOverride  = require('method-override')
const bodyParser = require('body-parser')
const mongoose = require ('mongoose')
const app = express ()
const db = mongoose.connection
const seedData = require('./models/seed-data.js')
const userData = require('./models/user-data.js')
const Workout = require('./models/workout-schema.js')
const User = require('./models/user-schema.js')
const userController = require('./controllers/users-controller.js')
const session = require('express-session')
const sessionsController = require('./controllers/sessions-controller.js')
require('dotenv').config()

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , () => {
    console.log('connected to mongo')
})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))

//___________________
//Middleware
//___________________
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: false}))
app.use('/users', userController)
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
)
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
}
app.use('/sessions', sessionsController)

// SEED DATA ROUTE
app.get('/seed', (req, res)=>{
    Workout.create(seedData, (err, createdSeedData)=>{
            res.redirect('/')
        }
    )
})

// NEW WORKOUT CREATE PAGE ROUTE
app.get('/workouts/new', isAuthenticated, (req, res) => {
    res.render('log-workout.ejs', {
        currentUser: req.session.currentUser
    })
})

// NEW WORKOUT POST ROUTE
app.post('/workouts', isAuthenticated, (req, res) => {
    Workout.create(req.body, (error, createdWorkout) => {
        res.redirect('/workouts')
    })
})

// ROUTE FOR LOGIN PAGE
app.get('/' , (req, res) => {
    res.render('login.ejs', {
        currentUser: req.session.currentUser
    })
})

// ROUTE FOR CREATING NEW USER
app.post('/login/new', (req, res) => {
    User.create(req.body, (error, createdUser) => {
        res.redirect('/home')
    })
})

// ROUTE FOR SIGN UP PAGE
app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

// ROUTE FOR HOME PAGE
app.get('/home', isAuthenticated, (req, res) => {
  res.render('index.ejs', {
      currentUser: req.session.currentUser
    })
})

// ROUTE FOR DASHBOARD PAGE
app.get('/dashboard', isAuthenticated, (req, res) => {
    Workout.find({}, (error, allWorkouts) => {
        res.render('dashboard.ejs', {
            workouts: allWorkouts,
            currentUser: req.session.currentUser
        })
    })
})

// ROUTE TO VIEW ALL WORKOUTS ON WORKOUT HISTORY PAGE
app.get('/workouts/', isAuthenticated, (req, res)=>{
    Workout.find({}, (error, allWorkouts)=>{
        res.render('workout-history.ejs', {
            workouts: allWorkouts,
            currentUser: req.session.currentUser
        })
    })
})

// SHOW SPECIFIC WORKOUT ROUTE
app.get('/workouts/:id', isAuthenticated, (req, res)=>{
    Workout.findById(req.params.id, (err, foundWorkout)=>{
        res.render('view-workout.ejs', {
            workout: foundWorkout,
            currentUser: req.session.currentUser
        })
    })
})

// DELETE SPECIFIC WORKOUT ROUTE
app.delete('/workouts/:id', isAuthenticated, (req, res)=>{
    Workout.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/workouts/')
    })
})

// EDIT EXISTING WORKOUT PAGE GET ROUTE
app.get('/workouts/:id/edit', isAuthenticated, (req, res)=>{
    Workout.findById(req.params.id, (err, foundWorkout)=>{
        res.render(
    		'edit-workout.ejs',
    		{
    			workout: foundWorkout,
                currentUser: req.session.currentUser
    		}
    	)
    })
})

// EDIT A SPECIFIC WORKOUT PUT ROUTE
app.put('/workouts/:id', isAuthenticated, (req, res)=>{
    Workout.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedWorkout)=>{
        res.redirect('/workouts')
    })
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT))