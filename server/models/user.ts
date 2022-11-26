import { Sequelize } from "../db";
export const database_1 = require('../db')

interface User {
    id: number;
    user: string;
    password: string;
}

export const User = database_1.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
    }, {
        timestamps: false
    });

module.exports = User;