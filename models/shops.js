const { DataTypes } = require("sequelize")
const sequelize = require('../middlewares/database')

const Shop = sequelize.define(
    "Shop",
    {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        createdAt: false,
        updatedAt: false
    }
)

module.exports = Shop