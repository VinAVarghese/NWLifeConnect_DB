module.exports = function(sequelize, DataTypes) {
    let Admin = sequelize.define("Admin", {
        name: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return Admin;
}