'use strict'
const {
  Model
} = require('sequelize')
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
        as: 'profile',
        onDelete: 'CASCADE'
      })
      this.hasMany(models.Message, {
        foreignKey: 'id',
        as: 'messages',
        onDelete: 'CASCADE'
      })
      this.hasMany(models.ChatMember, {
        foreignKey: 'id',
        as: 'chatMembers',
        onDelete: 'CASCADE'
      })
      User.hasMany(models.Contact, { as: 'UserBase', foreignKey: 'userBase' })
      User.hasMany(models.Contact, { as: 'UserContact', foreignKey: 'userContact' })
    }
  }
  User.init({
    phoneNumber: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: DataTypes.ENUM('admin', 'user')
  }, {
    sequelize,
    modelName: 'User'
  })
  return User
}
