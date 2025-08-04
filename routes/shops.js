var express = require('express');
var router = express.Router();
let tokenVerify = require("../middlewares/tokenHandle")
const Shop = require("../models/shops")  //เรียกโมเดลของ shop มาใช้

/* GET name listing. */
router.get('/', async function (req, res, next) {
  const name = req.query.name
  let condition = name ? { where: { name } } : {}
  let shopData = await Shop.findAll(condition)
  res.status(200).json({
    success: true,
    data: shopData
  })
});


//ทำ create shop ใส่ name Address  Post http://localhost:4000/shops
router.post('/', [tokenVerify], async function (req, res) {
  try {
    const body = req.body
    console.log("=".repeat(30))
    console.log(body)
    console.log("=".repeat(30))
    let result = await Shop.create({
      name: body.name,
      address: body.address
    })
    console.log(result)

    res.status(200).json({
      success: true,
      message: "Shop created.",
      data: result
    })
  } catch (error) {
    console.log("=".repeat(30))
    console.log(error)
    console.log("=".repeat(30))
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})


//ทำ update Shop http://localhost:4000/shops/16 ต้องต่อด้วย id ที่ต้องการแก้ไข
router.put('/:id', [tokenVerify], async function (req, res) {
  try {
    const body = req.body
    const id = req.params.id
    const shops = await Shop.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if (!shops) {
      throw new Error("Shop not found.!!");
    }

    //ในการอัพเดตไม่ต้องการให้มีการตรวจสอบใดๆ
    let data = shops
    if (body.name) {
      data.name = body.name
    }

    if (body.address) {
      data.address = body.address
    }

    let result = await Shop.update(data, {
      where: {
        id: id
      }
    })
    res.status(200).json({
      success: true,
      message: "Shop Detail Update",
      data: {
        id: id,
        name: data.name,
        address: data.address
      }
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})


// ทำ deleted ต้องกดเลือกให้มันเป็น deleted ด้วยนะ http://localhost:4000/shops/11 ใส่เลข id ที่ต้องการลบ
router.delete('/:id', [tokenVerify], async (req, res) => {
  try {
    const id = req.params.id
    const shops = await Shop.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if (!shops) {
      throw new Error("shops not found.!!");
    }

    let result = await Shop.destroy({
      where: {
        id: id
      }
    })

    res.status(200).json({
      success: true,
      message: "Shop delete YayYay",
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