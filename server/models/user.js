"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.database_1 = void 0;
const db_1 = require("../db");
exports.database_1 = require('../db');
exports.User = exports.database_1.define('user', {
    id: {
        type: db_1.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user: {
        type: db_1.Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: db_1.Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});
module.exports = exports.User;
