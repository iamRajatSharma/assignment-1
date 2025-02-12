const jwt = require("jsonwebtoken");
const { loginInput } = require("../utils/validateInput");
const User = require("../Schema/User");
const bcrypt = require("bcrypt");
require("dotenv").config()


const createUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.json({ message: "Email is already registered with this email" });
        }

        const user = new User()
        user.email = email
        user.password = bcrypt.hashSync(password, 10)
        user.role = "USER"
        user.save()
        return res.json({ message: "User account created", user: { email, role: user.role } });
    }
    catch (error) {
        return res.status(500).send({ message: "Server error" })
    }
}


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "USER" }).select("-password")
        return res.status(200).send({ message: "Users list", users })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error })
    }
}


const getOneUser = async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.params.id, "role": "USER" }).select("-password")
        if (users) {
            return res.status(200).send(users)
        }
        return res.status(404).send({ message: "No users found" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error })
    }
}


const deleteUser = async (req, res) => {
    try {
        const users = await User.findOneAndDelete({ _id: req.params.id, "role": "USER" }).select("-password")
        if (users) {
            return res.status(200).send({ message: "User deleted successfully", users })
        }
        return res.status(404).send({ message: "No users found" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error })
    }
}

const updateUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findById({ _id: req.params.id, "role": "USER" })
        if (!user) {
            return res.status(200).send({ message: "User not found" })
        }
        user.email = email
        user.save();
        return res.status(200).send({ message: "User updated succesfully" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: error })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    deleteUser,
    updateUser
}