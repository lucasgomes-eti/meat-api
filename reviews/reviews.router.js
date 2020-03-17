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

    applyRoutes(application) {
        application.get('/reviews', this.findAll)
        application.get('/reviews/:id', [this.validateId, this.findById])
        application.post('/reviews', this.save)

        application.put('/reviews/:id', [this.validateId, this.replace])
        application.patch('/reviews/:id', [this.validateId, this.update])
        application.del('/reviews/:id', [this.validateId, this.delete])
    }
}

const reviewsRouter = new ReviewRouter()

module.exports = reviewsRouter