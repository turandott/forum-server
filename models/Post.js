module.exports = (sequelize, Sequelize, DataTypes) => {
    const Post = sequelize.define("post", {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

    });
    return Post;
}
// Post.belongsToMany(Category, { through: "Category_Post" });
// Post.hasMany(Comment, { as: "comments" });


//post to comments
// Post.hasMany(Comment, { onDelete: "cascade", foreignKey: "postId" });
// Comment.belongsTo(Post);





//categories to posts m:n
// Post.belongsToMany(Category, {
//     through: CategoryPost,
//     foreignKey: "postId",
// });
// Category.belongsToMany(Post, {
//     through: CategoryPost,
//     foreignKey: "categoryId",
// });
// module.exports = Post;
