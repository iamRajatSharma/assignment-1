const jwt = require("jsonwebtoken");
const { loginInput } = require("../utils/validateInput");
const User = require("../Schema/User");
const bcrypt = require("bcrypt");
require("dotenv").config()

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "Email is not registered with us" });
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

        return res.json({ "message": "SignUp Successfully", token: token });
    }
    catch (error) {
        return res.send(error)
    }
}

const signUp = async (req, res) => {
    try {
        const { email, password, role } = req.body
        const user = new User()
        user.email = email
        user.password = bcrypt.hashSync(password, 10)
        user.role = role
        user.save()
        return res.json({ message: "Account created", user: { email, role } });
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Server error" })
    }
}


module.exports = {
    login,
    signUp
}