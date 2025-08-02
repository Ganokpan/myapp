let jwt = require("jsonwebtoken")

function tokenVerify(req, res, next) {
    try {
        const TOKEN = req.headers.authorization
        if (!TOKEN) {
            throw new Error("Token is required.")
        }
        console.log(TOKEN)
        let rawToken = TOKEN.slice(7)
        let tokenData = jwt.verify(rawToken, 'shhhhh')
        console.log(tokenData)
        next()
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

module.exports = tokenVerify