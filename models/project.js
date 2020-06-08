'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id_developer: DataTypes.INTEGER,
    project_name: DataTypes.STRING,
    project_desc: DataTypes.TEXT,
    id_genre: DataTypes.INTEGER,
    link_market : DataTypes.TEXT
  }, {});

  Project.associate = function(models) {
    // associations can be defined here
    Project.hasOne(models.Genre, {
      foreignKey: 'id',
      as: 'genre'
    })
  };
    
  return Project;
};