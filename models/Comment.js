module.exports = (sequelize, Sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {

        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

    });
    return Comment;
}

