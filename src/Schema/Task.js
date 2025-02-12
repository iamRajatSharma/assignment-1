const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    priority: String,
    due_date: String,
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Task', taskSchema)