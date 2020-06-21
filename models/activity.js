'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    object_name : DataTypes.STRING,
    ip          : DataTypes.STRING,
    ProjectId   : DataTypes.UUID,
    EventTypeId : DataTypes.INTEGER
  }, {});

  Activity.associate = function(models) {
    // associations can be defined here
    Activity.belongsTo(models.Project, {
      foreignKey: {
        allowNull: false
      }
    });

    Activity.belongsTo(models.EventType, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Activity;
};