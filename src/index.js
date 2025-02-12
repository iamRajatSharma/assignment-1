const express = require('express');
const allRouter = require('./routes');
const app = express();
require("dotenv").config()
require("./utils/database")


const PORT = process.env.PORT


app.use(express.json())
app.use('/v1/api/', allRouter)


app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server started on PORT : ${PORT}`)
        return
    }
    console.log(`Server error : ${err}`)
})