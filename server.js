//___________________
//Dependencies
//___________________
const express = require('express')
const methodOverride  = require('method-override')
const mongoose = require ('mongoose')
const app = express ()
const db = mongoose.connection
const seedData = require('./models/seed-data.js')
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
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

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

app.get('/' , (req, res) => {
  res.render('index.ejs')
})

app.get('/dashboard' , (req, res) => {
    res.render('dashboard.ejs')
})

app.get('/workouts/', (req, res)=>{
    Workout.find({}, (error, allWorkouts)=>{
        res.render('workout-history.ejs', {
            workouts: allworkouts
        })
    })
})

app.get('/workouts/new' , (req, res) => {
    res.render('log-workout.ejs')
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT))