let jwt = require("jsonwebtoken")
require('dotenv').config()

function tokenVerify(req, res, next) {
    try {
        const TOKEN = req.headers.authorization
        if (!TOKEN) {
            throw new Error("Token is required.")
        }
        //console.log(TOKEN)
        let rawToken = TOKEN.slice(7) // ตัดคำว่า "Bearer "
        const tokenData = jwt.verify(rawToken, process.env.JWT_SECRET);
        console.log(tokenData)
        next()
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

module.exports = tokenVerify