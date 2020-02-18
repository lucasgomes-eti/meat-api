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

        application.get('/users', this.findAll)
        application.get('/users/:id', [this.validateId, this.findById])
        application.post('/users', this.save)
        application.put('/users/:id', [this.validateId, this.replace])
        application.patch('/users/:id', [this.validateId, this.update])
        application.del('/users/:id', [this.validateId, this.delete])
    }
}

const usersRouter = new UsersRouter()

module.exports = usersRouter