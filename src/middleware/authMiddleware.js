const jwt = require("jsonwebtoken");


const tokenValidator = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token || token == undefined) {
            return res.json({ message: "please provide token" })
        }
        const checkToken = jwt.verify(token, process.env.JWT_SECRET)
        if (checkToken) {
            req.userId = checkToken.userId
            req.userRole = checkToken.userRole
            next();
        }
    }
    catch (error) {
        return res.json(error)
    }
}

const checkRole = (req, res, next) => {
    try {
        if (req.userRole != "ADMIN") {
            return res.status(500).json({ message: "You are not the authorized person to perform this task" })
        }
        next()
    }
    catch (error) {
        return res.json(error)
    }
}


module.exports = {
    tokenValidator,
    checkRole
}