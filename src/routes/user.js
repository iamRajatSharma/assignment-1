const express = require("express");
const { createUser, allUsers, getAllUsers, getOneUser, deleteUser, updateUser } = require("../controllers/user");
const { tokenValidator, checkRole, adminAccess } = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/", tokenValidator, checkRole, createUser);
userRouter.get("/", tokenValidator, adminAccess, getAllUsers)
userRouter.get("/:id", tokenValidator, checkRole, getOneUser)
userRouter.delete("/:id", tokenValidator, checkRole, deleteUser)
userRouter.patch("/:id", tokenValidator, checkRole, updateUser)




module.exports = userRouter;