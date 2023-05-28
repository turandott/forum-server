const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Category = require("./Category");
const Post = require("./Post");

class CategoryPost extends Model { }
CategoryPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    {
        sequelize,
        modelName: "category_post",
        timestamps: false,
    }
);



module.exports = CategoryPost;