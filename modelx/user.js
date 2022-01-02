const { Sequelize, DataTypes } = require('sequelize')
const database = require('../datax/db')

const User = database.define('user', {
    // Model attributes are defined here
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sobrenome: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
    timestamps: true
  });

module.exports = { User }