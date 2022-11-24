export const Sequelize = require('sequelize');

require("dotenv").config();
console.log(process.env.USER)

const sequelize = new Sequelize(process.env.BANCO, process.env.USER, process.env.PASSWORD,{
    dialect: 'postgres',
    host: 'localhost',
    port: 5432 
})

module.exports = sequelize;