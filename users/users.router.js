const ModelRouter = require('../common/model-router')
const User = require('./users.model')


class UsersRouter extends ModelRouter {
    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
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

const usersRouter = new UsersRouter()

module.exports = usersRouter