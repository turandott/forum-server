const Sequelize = require("sequelize");
const config = require("../config/dbConfig");

const sequelize = new Sequelize("forum_db", "root", "password", {
    dialect: "mysql",
    host: "localhost",
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.js")(sequelize, Sequelize, Sequelize.DataTypes);
db.password = require("./Password.js")(sequelize, Sequelize, Sequelize.DataTypes);
db.post = require("./Post.js")(sequelize, Sequelize, Sequelize.DataTypes);
db.comment = require("./Comment.js")(sequelize, Sequelize, Sequelize.DataTypes);
db.category = require("./Category.js")(sequelize, Sequelize, Sequelize.DataTypes);
db.post_category = require("./Post_Category.js")(sequelize, Sequelize, Sequelize.DataTypes);
db.role = require("./Role.js")(sequelize, Sequelize, Sequelize.DataTypes);

db.user.hasOne(db.password, {
    onDelete: "cascade",
    onUpdate: "cascade",
})


db.user.hasMany(db.post, {
    onDelete: "cascade",
})

db.user.hasMany(db.comment)

db.post.hasMany(db.comment)

db.post.belongsToMany(db.category, {
    through: db.post_category,
    foreignKey: "postId",
    otherKey: "categoryId",
})

db.category.belongsToMany(db.post, {
    through: db.post_category,
    foreignKey: "categoryId",
    otherKey: "postId",
})



db.user.belongsToMany(db.user, {
    through: "follow",
    foreignKey: "userId",
    as: 'followed',

})
db.user.belongsToMany(db.user, {
    through: "follow",
    foreignKey: "userId",
    as: 'followers',

})

db.role.hasMany(db.user)

module.exports = db;