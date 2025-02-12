const express = require("express");
const authRouter = require("./auth");
const { tokenValidator } = require("../middleware/authMiddleware");
const userRouter = require("./user");
const taskRouter = require("./task");
const allRouter = express.Router();

allRouter.use("/auth", authRouter)
allRouter.use("/user", userRouter)
allRouter.use("/task", taskRouter)

module.exports = allRouter;