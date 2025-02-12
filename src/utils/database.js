const mongoose = require("mongoose")

const conn = mongoose.connect("mongodb+srv://rajat:12345@cluster0.6wrjo.mongodb.net/assignment1?retryWrites=true&w=majority&appName=cluster0")

console.log('DB Connected')

module.exports = conn