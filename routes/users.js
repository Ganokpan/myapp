var express = require('express');
var router = express.Router();
const User = require('../models/user');
const { route, routes } = require('../app');
const bcrypt = require("bcrypt")

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const username = req.query.username
  let condition = username ? { where: { username } } : {}
  let usersData = await User.findAll(condition)
  res.status(200).json({
    success: true,
    data: usersData
  })
});


router.post('/', async function (req, res) {
  try {
    const body = req.body
    console.log("=".repeat(30))
    console.log(body)
    console.log("=".repeat(30))
    if (!body.username || !body.password) {
      throw new Error("username or password is required.!")
    }
    if (body.password !== body.confirmPassword) {
      throw new Error("password and confirmPassword not matching.!")
    }

    //hashpassword
    let hashPassword = await bcrypt.hash(body.password, 10)

    //create http://localhost:4000/users ใส่ username password confirmPassword
    let result = await User.create({
      username: body.username,
      password: hashPassword,
      fullname: body.fullname || ""
    })
    console.log(result)

    res.status(200).json({
      success: true,
      message: "User created.",
      data: result
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

//ทำ update http://localhost:4000/users/16 ต้องต่อด้วย id ที่ต้องการแก้ไขและใส่ข้อมูลที่ต้องการแก้โดยที่จะไม่สามารถแก้ username ได้
router.put('/:id', async function (req, res) {
  try {
    const body = req.body
    const id = req.params.id
    const user = await User.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if (!user) {
      throw new Error("User not found.!!");
    }
    //ถ้ามีการใส่ passwordใหม่จะต้อง comfirmpassword ก่อนจึงจะเปลี่ยนให้ 
    let data = user
    if (body.password) {
      if (!body.currentPassword) {
        throw new Error("CurrentPassword is required.");
      }

      let currentPasswordIsValid = await bcrypt.compare(body.currentPassword, data.password)
      if (!currentPasswordIsValid) {
        throw new Error("CurrentPassword not matching.");
      }

      if (body.password !== body.confirmPassword) {
        throw new Error("password and confirmPassword mismatch");
      }

      data.password = await bcrypt.hash(body.password, 10)
    }

    //ถ้ามีการใส่ชื่อจริงเข้ามาก็จะเปลี่ยนชื่อให้เลยไม่ต้องยืนยัน แต่จะไม่เปลี่ยน username โดยเด็ดขาด
    if (body.fullname) {
      data.fullname = body.fullname
    }

    let result = await User.update(data, {
      where: {
        id: id
      }
    })
    res.status(200).json({
      success: true,
      message: "User Update",
      data: result
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

// ทำ deleted ต้องกดเลือกให้มันเป็น deleted ด้วยนะ http://localhost:4000/users/11 ใส่เลข id ที่ต้องการลบ
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if (!user) {
      throw new Error("User not found.!!");
    }

    let result = await User.destroy({
      where:{
        id : id
      }
    })

    res.status(200).json({
      success: true,
      message: "user delete",
      data: result
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

router.get('/me', function (req, res) {
  res.status(200).json({
    message: "Success"
  })
})

module.exports = router;