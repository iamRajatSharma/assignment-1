const jwt = require("jsonwebtoken");
const User = require("../Schema/User");
const bcrypt = require("bcrypt");
require("dotenv").config()

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Email is not registered with us" });
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ userId: user._id, userRole: user.role }, process.env.JWT_SECRET)

        return res.status(200).json({ "message": "SignIn Successfully", token: token });
    }
    catch (error) {
        return res.send(error)
    }
}

const signUp = async (req, res) => {
    try {
        const { email, password, role } = req.body

        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.status(400).json({ message: "Email is already registered with this email" });
        }

        const user = new User()
        user.email = email
        user.password = bcrypt.hashSync(password, 10)
        user.role = role
        user.save()
        return res.status(201).json({ message: "Account created", user: { email, role } });
    }
    catch (error) {
        console.log('error')
        return res.status(500).send({ message: "Server error" })
    }
}


module.exports = {
    login,
    signUp
}