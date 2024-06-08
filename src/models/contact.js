'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contact.belongsTo(models.User, { as: 'UserBase', foreignKey: 'userBase' });
      Contact.belongsTo(models.User, { as: 'UserContact', foreignKey: 'userContact' });
    }
  }
  Contact.init({
    nickname: DataTypes.STRING,
    userBase: DataTypes.INTEGER,
    userContact: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};