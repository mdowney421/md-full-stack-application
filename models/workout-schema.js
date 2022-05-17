const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    username: String,
    date: Date,
    type: String,
    duration: Number,
    caloriesBurned: Number,
    notes: String
})

module.exports = mongoose.model('Workout', workoutSchema)