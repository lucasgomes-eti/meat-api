const ModelRouter = require('./common/model-router')
const Restaurant = require('./restaurants/restaurants.model')
// const NotFoundError = require('restify-errors').NotFoundError

class BaseRouter extends ModelRouter {
    constructor() {
        super(Restaurant)
    }

    envelope(document) {
        let resource = Object.assign({
            _links: {
                users: '/users'
            }
        }, document.toJSON())
        return resource
    }
    applyRoutes(application) {
        application.get('/', this.find)
    }

    find = (req, resp, next) => {
        resp.json({
            routes: {
                users: '/users',
                restaurants: '/restaurants',
                reviews: '/reviews'
            }
        })
        next()
    }
}

const main = new BaseRouter()

module.exports = main