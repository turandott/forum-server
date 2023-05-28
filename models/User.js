const { Sequelize, Model, DataTypes } = require("sequelize");
const Password = require('./Password');
// const database = require('./index');
const sequelize = require("../config/dbConfig");
const Post = require("./Post");
const Comment = require("./Comment");
const Follow = require("./Follow");


class User extends Model { };
User.init({
    // id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     allowNull: false,
    // },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        allowNull: false,
        unique: true,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false
})
//user to password
User.hasOne(Password, { onDelete: "cascade", foreignKey: "userId" });
Password.belongsTo(User);

//user to posts
User.hasMany(Post, { onDelete: "cascade", foreignKey: "userId" });
Post.belongsTo(User);

//user to comments
User.hasMany(Comment, { onDelete: "cascade", foreignKey: "userId" });
Comment.belongsTo(User);

//user followers and followed
User.belongsToMany(User, {as: "follower", through: "Follow", foreignKey: "followerId"});
User.belongsToMany(User, {as: "followed", through: "Follow", foreignKey: "followedId"});

module.exports = User;