'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event_type = sequelize.define('Event_type', {
    event_type_name: DataTypes.STRING
  }, {});
  Event_type.associate = function(models) {
    // associations can be defined here
    Event_type.hasMany(models.Activity, {
      onDelete: "cascade"
    });
  };
  return Event_type;
};