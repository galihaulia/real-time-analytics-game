'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    object_name       : DataTypes.STRING,
    ip                : DataTypes.STRING,
    ProjectId         : DataTypes.INTEGER,
    EventTypeId       : DataTypes.INTEGER
  }, {});
  Activity.associate = function(models) {
    // associations can be defined here
    Activity.belongsTo(models.Project, {
      foreignKey: {
        allowNull: false
      }
    });

    Activity.belongsTo(models.Event_type, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Activity;
};