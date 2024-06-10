'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      this.belongsTo(models.Chat, {
        foreignKey: 'chatId',
        as: 'chat'
      });
    }
  }
  ChatMember.init({
    userId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER,
    role: DataTypes.ENUM = {
      ADMIN: 'admin',
      MEMBER: 'member'
    }
  }, {
    sequelize,
    modelName: 'ChatMember',
  });
  return ChatMember;
};
