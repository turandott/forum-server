module.exports = (sequelize, Sequelize, DataTypes) => {
    const Post_Category = sequelize.define("post_category", {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
    return Post_Category;
};

