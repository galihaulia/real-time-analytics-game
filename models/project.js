'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    project_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    project_desc:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    link_market:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    DeveloperId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    GenreId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});

  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.Developer,{
      foreignKey: {allowNull: false}
    });

    Project.belongsTo(models.Genre,{
      foreignKey: {allowNull: false}
    });

    Project.hasMany(models.Activity,{
      onDelete: "cascade"
    });
  };

  return Project;
};