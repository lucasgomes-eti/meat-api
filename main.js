const Server = require('./server/server')
const usersRouter = require('./users/users.router')
const restaurantsRouter = require('./restaurants/restaurants.router')

const server = new Server()

server.bootstrap([usersRouter, restaurantsRouter]).then(server => {
    console.log('Started at:', server.application.address())
}).catch(error => {
    console.log('Failed to start')
    console.error(error)
    process.exit(1)
}) 