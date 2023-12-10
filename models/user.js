'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isAlpha: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isAlpha: true,
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        isEmail: true, 
      }
    } ,
    role: {
      type: DataTypes.STRING,
      allowNull:false,
    } ,
    password: {
      type: DataTypes.STRING,
      allowNull:false,
    } ,
  }, {
    sequelize,
    modelName: 'user',
  });
  User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, 10); // Hash the password before storing it
  });
  return User;
};