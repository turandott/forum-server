const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/dbConfig");
// const Post = require("./Post");

class Comment extends Model { };

Comment.init({
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},

    {
        sequelize,
        modelName: 'comment',
    }
)


module.exports = Comment;