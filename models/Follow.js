const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConfig");

class Follow extends Model { }
Follow.init(
    {
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        followerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        followedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "follow",
        timestamps: false,
    }
);


module.exports = Follow;