//___________________
//Dependencies
//___________________
const express = require('express')
const { redirect } = require('express/lib/response')
const methodOverride  = require('method-override')
const mongoose = require ('mongoose')
const app = express ()
const db = mongoose.connection
const seedData = require('./models/seed-data.js')
const userData = require('./models/user-data.js')
const Workout = require('./models/workout-schema.js')
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

//use public folder for static assets
app.use(express.static('public'))

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json())// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(methodOverride('_method'))// allow POST, PUT and DELETE from a form


// SEED DATA ROUTE
app.get('/seed', (req, res)=>{
    Workout.create(seedData, (err, createdSeedData)=>{
            res.redirect('/')
        }
    )
})

// NEW WORKOUT CREATE PAGE ROUTE
app.get('/workouts/new' , (req, res) => {
    res.render('log-workout.ejs')
})

 // NEW WORKOUT POST ROUTE
app.post('/workouts', (req, res) => {
    Workout.create(req.body, (error, createdWorkout) => {
        res.redirect('/workouts')
    })
})

// ROUTE FOR LOGIN PAGE
app.get('/' , (req, res) => {
    res.render('login.ejs')
})

// ROUTE FOR USER AUTHENTICATION
app.get('/verifyuser' , (req, res) => {
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].username === req.query.username) {
            if (userData[i].password === req.query.password) {
                res.redirect('/home')
            }
        }
    }
    res.redirect('/')
})

// ROUTE FOR SIGN UP PAGE
app.get('/signup' , (req, res) => {
    res.render('signup.ejs')
})

// ROUTE FOR HOME PAGE
app.get('/home' , (req, res) => {
  res.render('index.ejs')
})

// ROUTE FOR DASHBOARD PAGE
app.get('/dashboard' , (req, res) => {
    Workout.find({}, (error, allWorkouts) => {
        res.render('dashboard.ejs', {
            workouts: allWorkouts
        })
    })
})

// ROUTE TO VIEW ALL WORKOUTS ON WORKOUT HISTORY PAGE
app.get('/workouts/', (req, res)=>{
    Workout.find({}, (error, allWorkouts)=>{
        res.render('workout-history.ejs', {
            workouts: allWorkouts
        })
    })
})

// SHOW SPECIFIC WORKOUT ROUTE
app.get('/workouts/:id', (req, res)=>{
    Workout.findById(req.params.id, (err, foundWorkout)=>{
        res.render('view-workout.ejs', {
            workout: foundWorkout
        })
    })
})

// DELETE SPECIFIC WORKOUT ROUTE
app.delete('/workouts/:id', (req, res)=>{
    Workout.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/workouts/')
    })
})

// EDIT EXISTING WORKOUT PAGE GET ROUTE
app.get('/workouts/:id/edit', (req, res)=>{
    Workout.findById(req.params.id, (err, foundWorkout)=>{
        res.render(
    		'edit-workout.ejs',
    		{
    			workout: foundWorkout
    		}
    	)
    })
})

// EDIT A SPECIFIC WORKOUT PUT ROUTE
app.put('/workouts/:id', (req, res)=>{
    Workout.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedWorkout)=>{
        res.redirect('/workouts')
    })
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT))