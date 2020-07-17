'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Developer = sequelize.define('Developer', {
    developer_name:{ 
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    address:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone:{
      type: DataTypes.STRING,
      allowNull: true
    },
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