const { z, string } = require("zod")

const loginInput = z.object({
    email: string,
    password: string
})

module.exports = {
    loginInput
}