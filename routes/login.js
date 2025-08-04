let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken')
let User = require('../models/user')

const bcrypt = require('bcrypt') //import bcrypt เข้ามาใช้งาน
const saltRounds = 10;

/* post users listing.  เพราะ login ส่ง body ผ่าน post*/
router.post('/', async function (req, res, next) {
    try {
        let body = req.body
        if (!body.username || !body.password) {
            throw new Error("Username and Password is request!!");
        }

        let usernameIsValid = false
        let passwordIsValid = false

        const userData = await User.findOne({
            where: {
                username: body.username
            },
            raw: true
        }) //เจออันไหนอันแรกเอาอันนั้น

        /*const username = req.query.username
        console.log("=".repeat(20))
        console.log(username)
        console.log("=".repeat(20))*/

        if (userData !== null) {
            usernameIsValid = true
            if (userData.password) {
                passwordIsValid = await bcrypt.compare(body.password, userData.password)
            }
        }

        if (!usernameIsValid || !passwordIsValid) {
            throw new Error("username or password invalid.!")
        }
        let token = jwt.sign({ username: body.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "Login Success.",
            token: token
        })

        //let tokenData = jwt.decode(token)
        //console.log(tokenData)
        //console.log(new Date(tokenData.iat*1000))
        //console.log(new Date(tokenData.exp*1000))
    } catch (error) {
        res.status(401).json({
            message: error.message

        })
    }
});

module.exports = router;
