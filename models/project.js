'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    project_name  : DataTypes.STRING,
    project_desc  : DataTypes.TEXT,
    link_market   : DataTypes.TEXT,
    DeveloperId   : DataTypes.INTEGER,
    GenreId       : DataTypes.INTEGER
  }, {});

  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.Developer,{
      foreignKey: {
        allowNull: false
      }
    });

    Project.belongsTo(models.Genre, {
      foreignKey: {
        allowNull: false
      }
    });

    Project.hasMany(models.Activity,{
      onDelete: "cascade"
    });
  };

  return Project;
};