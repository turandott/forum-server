module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      
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
            allowNull: false,
            unique: true,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    });
    return User;
};
/*
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
*/


// module.exports = User;