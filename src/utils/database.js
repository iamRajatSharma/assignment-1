const mongoose = require("mongoose")

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then((success) => {
        console.log('Database connected')
    })
    .catch((error) => {
        console.log(error)
    })