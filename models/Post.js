const { Sequelize, DataTypes } = require("sequelize");
const Comment = require('./Comment');
const sequelize = require("../config/dbConfig");
const User = require("./User");
const Category = require("./Category");
const Category_Post = require("./Category_Post");


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
Post.belongsToMany(Category, { through: "Category_Post" });
Post.hasMany(Comment, { as: "comments" });
module.exports = Post;