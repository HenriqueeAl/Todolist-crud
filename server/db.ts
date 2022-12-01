export const Sequelize = require('sequelize');

require("dotenv").config();

const sequelize = new Sequelize(process.env.BANCO, process.env.USER, process.env.PASSWORD,{
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    port: process.env.PORT 
})

module.exports = sequelize;