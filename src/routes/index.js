const express = require("express");
const authRouter = require("./auth");
const { tokenValidator } = require("../middleware/authMiddleware");
const userRouter = require("./user");
const allRouter = express.Router();

allRouter.use("/auth", authRouter)
allRouter.use("/user", userRouter)

module.exports = allRouter;