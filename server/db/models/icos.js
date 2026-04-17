'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Icos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Favorite}) {
     this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Favorite, { foreignKey: 'icosId' });
    }
  }
  Icos.init({
    name: DataTypes.STRING,
    discription: DataTypes.TEXT,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Icos',
  });
  return Icos;
};