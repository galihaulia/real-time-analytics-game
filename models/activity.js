'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    object_name: DataTypes.STRING
  }, {});
  Activity.associate = function(models) {
    // associations can be defined here
  };
  return Activity;
};