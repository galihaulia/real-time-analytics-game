'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    object_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    ProjectId:{
      type: DataTypes.UUID,
      allowNull: false
    },
    EventTypeId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});

  Activity.associate = function(models) {
    // associations can be defined here
    Activity.belongsTo(models.Project, {
      foreignKey: {allowNull: false}
    });

    Activity.belongsTo(models.EventType, {
      foreignKey: {allowNull: false}
    });
  };

  return Activity;
};