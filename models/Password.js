const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Password = sequelize.define('Password', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
})

module.exports = Password;