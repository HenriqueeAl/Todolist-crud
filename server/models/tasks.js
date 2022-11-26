"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.database_2 = void 0;
const db_1 = require("../db");
exports.database_2 = require('../db');
exports.Task = exports.database_2.define('task', {
    id: {
        type: db_1.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    task: {
        type: db_1.Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});
module.exports = exports.Task;
