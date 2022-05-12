const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: String,
    firstName: String,
    lastName: String
})

module.exports = mongoose.model('User', userSchema)