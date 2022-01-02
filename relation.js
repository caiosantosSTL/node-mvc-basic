const dataCar = require('./modelx/car')
const dataUser = require('./modelx/user')

// um a um

// add FK userID em tabela Car
dataCar.Car.hasOne(dataUser.User)

dataUser.User.belongsTo(dataCar.Car);
