const ModelRouter = require('../common/model-router')
const Review = require('./reviews.model')

class ReviewRouter extends ModelRouter {
    constructor() {
        super(Review)
    }

    prepare = (query) => {
        return query
            .populate('user', 'name')
            .populate('restaurant')
    }

    envelope(document) {
        let resource = super.envelope(document)
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant
        resource._links.restaurant = `/restaurants/${restId}`
        return resource
    }

    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, this.save)

        application.put(`${this.basePath}/:id`, [this.validateId, this.replace])
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete])
    }
}

const reviewsRouter = new ReviewRouter()

module.exports = reviewsRouter