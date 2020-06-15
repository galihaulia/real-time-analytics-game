'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventType = sequelize.define('EventType', {
    event_type_name: DataTypes.STRING
  }, {});
  
  EventType.associate = function(models) {
    // associations can be defined here
    EventType.hasMany(models.Activity, {
      onDelete: "cascade"
    });
  };

  return EventType;
};