const roomsRouter = require('./rooms')
const rentersRouter = require('./renters')
const servicesRouter = require('./services')

const route = (app) => {
    app.use('/room', roomsRouter)
    app.use('/renter', rentersRouter)
    app.use('/service', servicesRouter)
}

module.exports = route