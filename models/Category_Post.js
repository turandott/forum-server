const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Category = require("./Category");
const Post = require("./Post");

const Category_Post = sequelize.define('Category_Post', {
    CategoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    },
    PostId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id'
        }
    }
},
    { timestamps: false });

module.exports = Category_Post;