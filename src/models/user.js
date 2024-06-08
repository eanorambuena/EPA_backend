'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Profile, {
        foreignKey: 'id',
        as: 'profile'
      });
      this.hasMany(models.Message, {
        foreignKey: 'id',
        as: 'messages'
      });
      User.hasMany(models.Contact, { as: 'UserBase', foreignKey: 'userBase' });
      User.hasMany(models.Contact, { as: 'UserContact', foreignKey: 'userContact' });
    }
  }
  User.init({
    phoneNumber: DataTypes.INTEGER,
    password: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};