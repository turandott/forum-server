const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Post = require("./Post");
const Category_Post = require("./CategoryPost");

class Category extends Model { };
Category.init({
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
},
    {
        sequelize,
        modelName: "category",
        timestamps: false,

    })
// Category.belongsToMany(Post, { through: "Category_Post" });
module.exports = Category;