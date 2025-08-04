var express = require('express');
var router = express.Router();
let tokenVerify = require("../middlewares/tokenHandle")

const CoffeeShop = [
    {
        name: "Graph Cafe",
        province: "เชียงใหม่",
        district: "เมืองเชียงใหม่"
    },
    {
        name: "Ristr8to Coffee",
        province: "เชียงใหม่",
        district: "เมืองเชียงใหม่"
    },
    {
        name: "The Little Prince Café Bangkok",
        province: "กรุงเทพมหานคร",
        district: "เขตสาทร"
    },
    {
        name: "Ryoku Cafe",
        province: "กรุงเทพมหานคร",
        district: "เขตวัฒนา"
    },
    {
        name: "Harudot Chonburi by Nana Coffee Roaster",
        province: "ชลบุรี",
        district: "เมืองชลบุรี"
    },
    {
        name: "Carp cafe'sriracha",
        province: "ชลบุรี",
        district: "ศรีราชา"
    },
    {
        name: "Refill Coffee",
        province: "ขอนแก่น",
        district: "เมืองขอนแก่น"
    },
    {
        name: "Godfather Coffee - II Khonkaen",
        province: "ขอนแก่น",
        district: "เมืองขอนแก่น"
    },
    {
        name: "Campus Coffee Roaster",
        province: "ภูเก็ต",
        district: "เมืองภูเก็ต"
    },
    {
        name: "The Feelsion Cafe",
        province: "ภูเก็ต",
        district: "เมืองภูเก็ต"
    }
]

/* GET users listing. */
router.get('/', [tokenVerify], function (req, res, next) {
  res.status(200).json({   //ส่งstatus 200 ว่าสำเร็จ แล้วส่ง Json กลับไปด้วย
    coffeeShops: CoffeeShop
  })
});

router.get('/name', function (request, response) {
  response.status(200).json({   //ส่งstatus 200 ว่าสำเร็จ แล้วส่ง Json กลับไปด้วย
    /*name: "coffee",
    city: "bangkok",*/
    coffeeShops: CoffeeShop
  })
})

router.post('/name', function (req, res) {
  try {
    let body = req.body
    console.log(body)

    if (!body.name) {
      throw new Error("Name Please!!");
      /*return res.status(400).json({
        message: "Name Please!!"
      })*/
    }

    if (!body.city) {
      throw new Error("city Please!!");
      /*return res.status(400).json({
        message: "Name Please!!"
      })*/
    }
    res.status(200).json({
      name: req.body.name,
      city: req.body.city
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})
module.exports = router;
