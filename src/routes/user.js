const express = require("express");
const { createUser, allUsers, getAllUsers, getOneUser, deleteUser, updateUser } = require("../controllers/user");
const { tokenValidator, checkRole } = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/", tokenValidator, checkRole, createUser);
userRouter.get("/", getAllUsers)
userRouter.get("/:id", getOneUser)
userRouter.delete("/:id", tokenValidator, checkRole, deleteUser)
userRouter.patch("/:id", tokenValidator, checkRole, updateUser)




module.exports = userRouter;