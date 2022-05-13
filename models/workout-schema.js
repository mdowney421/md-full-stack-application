const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    // username: {type: String, unique: true, required: true},
    date: Date,
    type: String,
    duration: Number,
    caloriesBurned: Number,
    notes: String
})

module.exports = mongoose.model('Workout', workoutSchema)