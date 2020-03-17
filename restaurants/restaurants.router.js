const ModelRouter = require('../common/model-router')
const Restaurant = require('./restaurants.model')
const NotFoundError = require('restify-errors').NotFoundError

class RestaurantRouter extends ModelRouter {
    constructor() {
        super(Restaurant)
    }

    envelope(document) {
        let resource = super.envelope(document)
        resource._links.menu = `${this.basePath}/${resource._id}/menu`
        return resource
    }

    findMenu = (req, resp, next) => {
        Restaurant.findById(req.params.id, "+menu")
            .then(rest => {
                if (!rest) {
                    throw new NotFoundError('Restaurant not found')
                } else {
                    resp.json(rest.menu)
                    return next()
                }
            }).catch(next)
    }

    replaceMenu = (req, resp, next) => {
        Restaurant.findById(req.params.id)
            .then(rest => {
                if (!rest) {
                    throw new NotFoundError('Restaurant not found')
                } else {
                    rest.menu = req.body
                    return rest.save()
                }
            }).then(rest => {
                resp.json(rest.menu)
                return next()
            }).catch(next)
    }

    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, [this.validateId, this.replace])
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete])

        application.get(`${this.basePath}/:id/menu`, [this.validateId, this.findMenu])
        application.put(`${this.basePath}/:id/menu`, [this.validateId, this.replaceMenu])
    }
}

const restaurants = new RestaurantRouter()

module.exports = restaurants