const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConfig");

class Password extends Model { };

Password.init({
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        sequelize,
        modelName: "password",
        timestamps: false,
    }

)

module.exports = Password;
