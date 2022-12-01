"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = exports.database_2 = void 0;
const db_1 = require("../db");
exports.database_2 = require('../db');
exports.Tasks = exports.database_2.define('tasks', {
    id: {
        type: db_1.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: db_1.Sequelize.STRING,
        allowNull: false
    },
    complete: {
        type: db_1.Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});
module.exports = exports.Tasks;
