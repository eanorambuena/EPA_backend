'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Message, {
        foreignKey: 'id',
        as: 'messages'
      })
      this.hasMany(models.ChatMember, {
        foreignKey: 'id',
        as: 'chatMembers'
      })
    }
  }
  Chat.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chat'
  })
  return Chat
}
