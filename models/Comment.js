const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Post = require("./Post");

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },


})


module.exports = Comment;