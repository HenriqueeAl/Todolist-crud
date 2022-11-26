import { Sequelize } from "../db";
export const database_2 = require('../db')

export const Task = database_2.define('task', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    task: {
        type: Sequelize.STRING,
        allowNull: false
    }
    }, {
        timestamps: false
    });

module.exports = Task;