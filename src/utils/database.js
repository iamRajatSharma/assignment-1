const mongoose = require("mongoose")

const mongoURI = 'mongodb://localhost:27017/assignment1';
mongoose.connect(mongoURI)
    .then((success) => {
        console.log('Database connected')
    })
    .catch((error) => {
        console.log(error)
    })