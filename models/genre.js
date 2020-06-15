'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    genre_name: DataTypes.STRING,
    genre_desc: DataTypes.TEXT,
  }, {});

  Genre.associate = function(models) {
    // associations can be defined here
    Genre.hasMany(models.Project, {
      onDelete: "cascade"
    });
  };
  
  return Genre;
};