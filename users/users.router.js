const ModelRouter = require('../common/model-router')
const User = require('./users.model')
const authenticate = require('../security/auth.handler')
const authorize = require('../security/authz.handler')


class UsersRouter extends ModelRouter {
    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }
    applyRoutes(application) {

        application.get(`${this.basePath}`, [authorize('admin'), this.findAll])
        application.get(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.findById])
        application.post(`${this.basePath}`, [authorize('admin'), this.save])
        application.put(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.replace])
        application.patch(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.update])
        application.del(`${this.basePath}/:id`, [authorize('admin'), this.validateId, this.delete])

        application.post(`${this.basePath}/authenticate`, authenticate)
    }
}

const usersRouter = new UsersRouter()

module.exports = usersRouter