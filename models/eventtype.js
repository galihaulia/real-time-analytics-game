'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventType = sequelize.define('EventType', {
    event_type_name:{
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  
  EventType.associate = function(models) {
    // associations can be defined here
    EventType.hasMany(models.Activity, {
      onDelete: "cascade"
    });
  };

  return EventType;
};