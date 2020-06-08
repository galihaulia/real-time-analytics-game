'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    developer_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Project, {
      foreignKey: 'id_developer',
      as: 'project'
    })
  };
  
  User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  });
  
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};