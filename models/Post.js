const { Sequelize, DataTypes } = require("sequelize");
const database = require('./index');
const sequelize = require("../config/dbConfig");

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // content: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    // },


})

Post.hasMany(Comment, { as: "comments" });

module.exports = User;