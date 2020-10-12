module.exports = function(sequelize, DataTypes) {
    let Admin = sequelize.define("Admin", {
        userName: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return Admin;
}