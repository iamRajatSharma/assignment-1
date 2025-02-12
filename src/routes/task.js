const express = require("express");
const { tokenValidator, checkRole } = require("../middleware/authMiddleware");
const { createTask, getAllTask, getOneTask, deleteTask, updateTask } = require("../controllers/task");
const taskRouter = express.Router();

taskRouter.post("/", tokenValidator, createTask);
taskRouter.get("/", tokenValidator, getAllTask)
taskRouter.get("/:id", tokenValidator, getOneTask)
taskRouter.delete("/:id", tokenValidator, deleteTask)
taskRouter.patch("/:id", tokenValidator, updateTask)




module.exports = taskRouter;