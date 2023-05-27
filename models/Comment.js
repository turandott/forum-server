const { Sequelize, DataTypes } = require("sequelize");
const database = require('./index');
const sequelize = require("../config/dbConfig");

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
Comment.belongsTo(Post, {
    foreignKey: "postId",
    as: "post",
});
