'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define('Developer', {
    developer_name  : DataTypes.STRING,
    email           : DataTypes.STRING,
    username        : DataTypes.STRING,
    password        : DataTypes.STRING,
    description     : DataTypes.STRING,
    address         : DataTypes.STRING,
    phone           : DataTypes.STRING,
  }, {});

  Developer.associate = function(models) {
    Developer.hasMany(models.Project, {
      onDelete: "cascade"
    });
  };
  
  Developer.beforeCreate((developer, options) => {
    const salt = bcrypt.genSaltSync();
    developer.password = bcrypt.hashSync(developer.password, salt);
  });
  
  Developer.prototype.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
  };

  return Developer;
};