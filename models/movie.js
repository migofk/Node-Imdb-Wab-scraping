'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    year:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    poster:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false,
    },
    runtime:{
      type: DataTypes.INTEGER,
      allowNull:true,
      validate: {
        isInt: true,
      },
    },
    genre:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    rate:{
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        isNumeric: true,
      },
    },
    vote:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: true,
      },
    },
    certificate:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    cast:{
      type: DataTypes.JSON,
      allowNull:true,
    },
    gross:{
      type: DataTypes.STRING,
      allowNull:true,
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};