const jwt = require("jsonwebtoken");
const { loginInput } = require("../utils/validateInput");
const bcrypt = require("bcrypt");
const Task = require("../Schema/Task");
require("dotenv").config()


const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, due_date } = req.body

        const checkTask = await Task.findOne({ title })
        if (checkTask) {
            return res.json({ message: "This task is already registered" });
        }

        const task = new Task()
        task.title = title
        task.description = description
        task.status = status
        task.priority = priority
        task.due_date = due_date
        task.assigned_to = req.userId
        task.save()
        return res.json({ message: "User account created", task: { task } });
    }
    catch (error) {
        return res.status(500).send({ message: error })
    }
}


const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find({ assigned_to: req.userId })
        return res.status(200).send({ message: "Task list", tasks })
    }
    catch (error) {
        return res.status(500).send({ message: error })
    }
}


const getOneTask = async (req, res) => {
    try {
        const task = await Task.findOne({ assigned_to: req.userId, _id: req.params.id })
        if (task) {
            return res.status(200).send(task)
        }
        return res.status(404).send({ message: "No task found" })
    }
    catch (error) {
        return res.status(500).send({ message: error })
    }
}


const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ assigned_to: req.userId, _id: req.params.id })
        if (task) {
            return res.status(200).send({ message: "Task deleted successfully", task })
        }
        return res.status(404).send({ message: "No task found" })
    }
    catch (error) {
        return res.status(500).send({ message: error })
    }
}

const updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, due_date } = req.body;

        const task = await Task.findOne({ assigned_to: req.userId, _id: req.params.id })
        if (!task) {
            return res.status(200).send({ message: "Task not found" })
        }
        task.title = title
        task.description = description
        task.status = status
        task.priority = priority
        task.due_date = due_date
        task.save();
        return res.status(200).send({ message: "Task updated succesfully", task })
    }
    catch (error) {
        return res.status(500).send({ message: error })
    }
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTask,
    getOneTask
}