const { Sequelize, Model, DataTypes } = require("sequelize");
const Comment = require('./Comment');
const sequelize = require("../config/dbConfig");
const User = require("./User");
const Category = require("./Category");
const Category_Post = require("./CategoryPost");
const CategoryPost = require("./CategoryPost");

class Post extends Model { };
Post.init({
    // id: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     allowNull: false,
    // },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
        sequelize,
        modelName: 'post',
    }
)
// Post.belongsToMany(Category, { through: "Category_Post" });
// Post.hasMany(Comment, { as: "comments" });


//post to comments
Post.hasMany(Comment, { onDelete: "cascade", foreignKey: "postId" });
Comment.belongsTo(Post);





//categories to posts m:n
Post.belongsToMany(Category, {
    through: CategoryPost,
    foreignKey: "postId",
});
Category.belongsToMany(Post, {
    through: CategoryPost,
    foreignKey: "categoryId",
});
module.exports = Post;