'use strict';
const {
    Model
} = require('sequelize');
const bcrypt = require("bcryptjs")
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.Profile)
            User.hasMany(models.Car)
        }
    }
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        hooks: {
            beforeCreate(instance, options) {
              const salt = bcrypt.genSaltSync(10)
              const hash = bcrypt.hashSync(instance.password, salt)
              instance.password = hash
            }
          },
        sequelize,
        modelName: 'User',
    });
    return User;
};