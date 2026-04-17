'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User,
      Icos}) {
       this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });

      this.belongsTo(Icos, {
        foreignKey: 'icosId',
        as: 'icos',
        onDelete: 'CASCADE',
      });
    }
  }
  Favorite.init({
    userId: DataTypes.INTEGER,
    icosId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};