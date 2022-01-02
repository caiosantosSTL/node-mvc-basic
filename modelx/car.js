const { Sequelize, DataTypes } = require('sequelize')
const database = require('../datax/db')

const Car = database.define('car', {
    // Model attributes are defined here
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
    timestamps: true
  });

module.exports = { Car }