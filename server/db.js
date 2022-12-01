"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequelize = void 0;
exports.Sequelize = require('sequelize');
require("dotenv").config();
const sequelize = new exports.Sequelize(process.env.BANCO, process.env.USER, process.env.PASSWORD, {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    port: process.env.PORT
});
module.exports = sequelize;
