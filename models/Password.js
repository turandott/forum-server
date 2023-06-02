module.exports = (sequelize, Sequelize, DataTypes) => {
    const Password = sequelize.define("password", {

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Password;
};

