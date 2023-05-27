const { Sequelize, DataTypes } = require("sequelize");
const Password = require("./Password")
// const database = require('./index');
const sequelize = require("../config/dbConfig");
const Post = require("./Post");
const Comment=require("./Comment");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // password: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    // },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        allowNull: false,
        unique: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },


})

User.hasOne(Password, { onDelete: "cascade" });
User.hasMany(Post, { onDelete: "cascade" });
User.hasMany(Comment, { onDelete: "cascade" });

module.exports = User;