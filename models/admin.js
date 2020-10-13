const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
    let Admin = sequelize.define("Admin", {
        name: { type: DataTypes.STRING, unique: true },
        password: DataTypes.STRING
    });

    //encrypt password before adding to database
    Admin.beforeCreate(function(admin){
      admin.password = bcrypt.hashSync(admin.password,bcrypt.genSaltSync(10),null);
    })
    
    return Admin;
  }
