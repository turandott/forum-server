const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize, DataTypes) => {
    const Role = sequelize.define("roles", {
        name: {
            type: DataTypes.STRING,
            defaultValue: "USER"
        },
    });
    return Role;
};
