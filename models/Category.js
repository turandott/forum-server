const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Post = require("./Post");
const Category_Post = require("./Category_Post");

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

})
// Category.belongsToMany(Post, { through: "Category_Post" });
module.exports = Category;