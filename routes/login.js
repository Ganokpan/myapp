var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
let User = require('../models/user')


/* post users listing.  เพราะ login ส่ง body ผ่าน post*/
router.post('/', async function (req, res, next) {
    try {
        let body = req.body
        /*if (!body.username) {
            throw new Error("Username is request!!");
        }
        if (!body.password) {
            throw new Error("Password is request!!");
        }*/

        if (!body.username || !body.password) {
            throw new Error("Username and Password is request!!");
        }

        let usernameIsValid = false
        let passwordIsValid = false

        const userData = await User.findOne({
            where: {
                username: body.username
            }
        }) //เจออันไหนอันแรกเอาอันนั้น
        if (userData !== null) {
            usernameIsValid = true
            if (userData.dataValues) {
                console.log("=".repeat(30))
                console.log(userData.dataValues)
                console.log("=".repeat(30))
                if (userData.dataValues.password === body.password) {
                    passwordIsValid = true
                }
            }
        }

        /*for (let user of userData) {
            //console.log(user)
            if (body.username == user.username) {
                usernameIsValid = true
            }
            if (body.password == user.password) {
                passwordIsValid = true
            }
        }*/
        /*for (let pass of userData) {
            if (body.password == pass.password) {
                passwordIsValid = true
            }
        }*/

        if (!usernameIsValid || !passwordIsValid) {
            throw new Error("Username or Password invalid!!");
        }

        let token = jwt.sign({ foo: 'bar' }, 'shhhhh', { expiresIn: "1h" });
        console.log(token)

        //let tokenData = jwt.decode(token)
        //console.log(tokenData)
        //console.log(new Date(tokenData.iat*1000))
        //console.log(new Date(tokenData.exp*1000))

        let isValidToken = jwt.verify(token, 'shhhhh')
        console.log(isValidToken)
        console.log(new Date(isValidToken.exp * 1000))
        /*if (!usernameIsValid) {
            throw new Error("Username invalid!!");
        }*/

        res.status(200).json({
            message: "Login Success",
            token: token
        })
    } catch (error) {
        res.status(401).json({
            message: error.message

        })
    }
});

module.exports = router;
