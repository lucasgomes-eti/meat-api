const Server = require('./server/server')
const baseRouter = require('./base.router')
const usersRouter = require('./users/users.router')
const restaurantsRouter = require('./restaurants/restaurants.router')
const reviewsRouter = require('./reviews/reviews.router')

const server = new Server()

server.bootstrap([baseRouter, usersRouter, restaurantsRouter, reviewsRouter]).then(server => {
    console.log('Started at:', server.application.address())
}).catch(error => {
    console.log('Failed to start')
    console.error(error)
    process.exit(1)
}) 