'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Notice.init(
    {
      uuid:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
      },
    poster: DataTypes.STRING,
    description: DataTypes.STRING,
    expires_at: DataTypes.STRING,
    hostel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notice',
  });
  return Notice;
};