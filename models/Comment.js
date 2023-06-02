module.exports = (sequelize, Sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {

        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        // commentId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
    });
    return Comment;
}

