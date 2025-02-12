const express = require("express");
const authRouter = require("./auth");
const allRouter = express.Router();

allRouter.use("/auth", authRouter)

module.exports = allRouter;