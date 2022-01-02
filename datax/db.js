const Sequelize = require('sequelize')
require('dotenv').config()

const dbuser = process.env.DB_USER
const dbpassw = process.env.DB_PASSW
const dbdialecx = process.env.DB_DIALECT
const dbhostx = process.env.DB_HOST

//o db crud ja deve estar criado
const sequelize = new Sequelize('novadb', `${dbuser}`, `${dbpassw}`, {
    dialect: `${dbdialecx}`,
    host: `${dbhostx}`
})

module.exports = sequelize